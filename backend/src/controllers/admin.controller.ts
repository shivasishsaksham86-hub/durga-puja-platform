import { Request, Response } from 'express';
import { prisma } from '../server';

export const getDashboardAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Get total users by role
    const usersCount = await prisma.user.groupBy({
      by: ['role'],
      _count: { id: true }
    });

    // 2. Get total bookings
    const totalBookings = await prisma.booking.count();
    
    // 3. Get total entries (scanned passes)
    const totalEntries = await prisma.booking.count({
      where: { status: 'SCANNED' }
    });

    // 4. Get active emergencies
    const activeEmergencies = await prisma.emergency.count({
      where: { status: 'REPORTED' }
    });

    // 5. Total donations
    const donations = await prisma.donation.aggregate({
      _sum: { amount: true },
      where: { status: 'SUCCESS' }
    });

    res.json({
      usersCount,
      totalBookings,
      totalEntries,
      activeEmergencies,
      totalDonations: donations._sum.amount || 0
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGatesStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const gatesData = await prisma.booking.groupBy({
      by: ['gateNumber', 'status'],
      _count: { id: true }
    });

    res.json(gatesData);
  } catch (error) {
    console.error('Gates status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
