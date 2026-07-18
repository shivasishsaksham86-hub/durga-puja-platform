import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

import authRoutes from './routes/auth.routes';
import passRoutes from './routes/pass.routes';
import adminRoutes from './routes/admin.routes';

export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/passes', passRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Durga Puja Platform API is running' });
});

// Socket.io setup for real-time features
let currentCrowd = 0;

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Send current crowd to newly connected clients
  socket.emit('crowd_update', { currentCrowd });

  socket.on('update_crowd', (data: { increment: boolean, gateNumber: number }) => {
    // Ideally verify if user is volunteer
    if (data.increment) {
      currentCrowd++;
    } else {
      currentCrowd = Math.max(0, currentCrowd - 1);
    }
    
    // Broadcast to all clients
    io.emit('crowd_update', { currentCrowd, lastUpdatedGate: data.gateNumber });
  });

  socket.on('report_emergency', async (data: { type: any, location: string, reportedById: string }) => {
    try {
      const emergency = await prisma.emergency.create({
        data: {
          type: data.type,
          location: data.location,
          reportedById: data.reportedById,
        }
      });
      // Broadcast emergency to admins
      io.emit('emergency_alert', emergency);
    } catch (e) {
      console.error(e);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
