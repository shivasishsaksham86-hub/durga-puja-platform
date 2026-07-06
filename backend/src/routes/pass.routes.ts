import { Router } from 'express';
import { bookPass, validatePass } from '../controllers/pass.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Any authenticated user can book a pass
router.post('/book', authenticate, bookPass);

// Only volunteers, committee, or admins can validate passes
router.post('/validate', authenticate, authorize(['VOLUNTEER', 'COMMITTEE', 'ADMIN']), validatePass);

export default router;
