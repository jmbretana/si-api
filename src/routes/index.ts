import express from 'express';
import fcRoutes from './fc.routes';
import spRoutes from './sp.routes';
import oriRoutes from './ori.routes';
import userRoutes from './user.routes';
import fcHistoryRoutes from './fc-history.routes';
import oriHistoryRoutes from './ori-history.routes';
import spHistoryRoutes from './sp-history.routes';

const router = express.Router();

// Main resources
router.use('/fc', fcRoutes);
router.use('/sp', spRoutes);
router.use('/ori', oriRoutes);
router.use('/users', userRoutes);

// History resources
router.use('/fc-history', fcHistoryRoutes);
router.use('/ori-history', oriHistoryRoutes);
router.use('/sp-history', spHistoryRoutes);

export default router;
