import express from 'express';
import fcHistoryController from '../controllers/fc-history.controller';

const router = express.Router();

router.post('/', fcHistoryController.create.bind(fcHistoryController));
router.get('/', fcHistoryController.getAll.bind(fcHistoryController));
router.get('/range', fcHistoryController.getByDateRange.bind(fcHistoryController));
router.get('/:uuid', fcHistoryController.getByUuid.bind(fcHistoryController));
router.delete('/:uuid', fcHistoryController.delete.bind(fcHistoryController));

export default router;
