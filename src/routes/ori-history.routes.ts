import express from 'express';
import oriHistoryController from '../controllers/ori-history.controller';

const router = express.Router();

router.post('/', oriHistoryController.create.bind(oriHistoryController));
router.get('/', oriHistoryController.getAll.bind(oriHistoryController));
router.get('/range', oriHistoryController.getByDateRange.bind(oriHistoryController));
router.get('/:uuid', oriHistoryController.getByUuid.bind(oriHistoryController));
router.delete('/:uuid', oriHistoryController.delete.bind(oriHistoryController));

export default router;
