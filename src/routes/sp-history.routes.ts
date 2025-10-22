import express from 'express';
import spHistoryController from '../controllers/sp-history.controller';

const router = express.Router();

router.post('/', spHistoryController.create.bind(spHistoryController));
router.get('/', spHistoryController.getAll.bind(spHistoryController));
router.get('/range', spHistoryController.getByDateRange.bind(spHistoryController));
router.get('/:uuid', spHistoryController.getByUuid.bind(spHistoryController));
router.delete('/:uuid', spHistoryController.delete.bind(spHistoryController));

export default router;
