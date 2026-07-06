import { Request, Response } from 'express';
import { prisma } from '../server';
import crypto from 'crypto';
import QRCode from 'qrcode';
import { AuthRequest } from '../middlewares/auth.middleware';

// Generate QR Code hash
const generateQRHash = (userId: string, eventId: string, timestamp: number) => {
  return crypto.createHash('sha256').update(`${userId}-${eventId}-${timestamp}`).digest('hex');
};

export const bookPass = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { eventId, date, gateNumber } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Check if event exists
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    // Generate unique QR hash
    const timestamp = Date.now();
    const qrCodeHash = generateQRHash(userId, eventId, timestamp);
    
    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        eventId,
        date: new Date(date),
        gateNumber,
        qrCodeHash
      }
    });

    // Generate QR Code data URI (optional, can be generated on frontend instead)
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeHash);

    res.status(201).json({
      message: 'Pass booked successfully',
      booking,
      qrCodeDataUrl
    });
  } catch (error) {
    console.error('Book pass error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const validatePass = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { qrCodeHash } = req.body;
    const volunteerId = req.user?.userId;

    if (!volunteerId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const booking = await prisma.booking.findUnique({
      where: { qrCodeHash },
      include: { user: true, event: true }
    });

    if (!booking) {
      res.status(404).json({ error: 'Invalid Pass: Not found', valid: false });
      return;
    }

    if (booking.status !== 'VALID') {
      res.status(400).json({ error: `Pass already ${booking.status.toLowerCase()}`, valid: false });
      return;
    }

    // Update booking status
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: 'SCANNED',
        entryTime: new Date(),
        scannedById: volunteerId
      }
    });

    // Add audit log
    await prisma.auditLog.create({
      data: {
        action: 'PASS_SCANNED',
        userId: volunteerId,
        details: `Scanned pass for user ${booking.userId} at event ${booking.eventId}`
      }
    });

    res.json({
      message: 'Pass validated successfully',
      valid: true,
      booking: {
        userName: booking.user.name,
        eventName: booking.event.title,
        gateNumber: booking.gateNumber
      }
    });
  } catch (error) {
    console.error('Validate pass error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
