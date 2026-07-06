import { Router } from 'express';
import { getDashboardAnalytics, getGatesStatus } from '../controllers/admin.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Only Admins and Committee members can access these analytics
router.use(authenticate, authorize(['ADMIN', 'COMMITTEE']));

router.get('/analytics', getDashboardAnalytics);
router.get('/gates', getGatesStatus);

export default router;
