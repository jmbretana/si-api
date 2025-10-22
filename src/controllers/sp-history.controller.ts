import { Request, Response, NextFunction } from 'express';
import spHistoryService from '../services/sp-history.service';

class SpHistoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuid, sp, spSeconds, timeStamp } = req.body;

      if (!uuid || sp === undefined || spSeconds === undefined || !timeStamp) {
        return res.status(400).json({
          error: 'Todos los campos son requeridos',
          required: ['uuid', 'sp', 'spSeconds', 'timeStamp'],
        });
      }

      const existingRecord = await spHistoryService.findByUuid(uuid);
      if (existingRecord) {
        return res.status(409).json({
          error: 'Ya existe un registro con este UUID',
        });
      }

      const newRecord = await spHistoryService.create(req.body);

      res.status(201).json({
        message: 'Registro de historial creado exitosamente',
        data: newRecord,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const records = await spHistoryService.findAll(limit);

      res.json({
        message: 'Registros de historial obtenidos exitosamente',
        count: records.length,
        data: records,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByUuid(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;
      const record = await spHistoryService.findByUuid(uuid);

      if (!record) {
        return res.status(404).json({
          error: 'Registro no encontrado',
        });
      }

      res.json({
        message: 'Registro obtenido exitosamente',
        data: record,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByDateRange(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          error: 'startDate y endDate son requeridos',
        });
      }

      const records = await spHistoryService.findByDateRange(
        new Date(startDate as string),
        new Date(endDate as string)
      );

      res.json({
        message: 'Registros obtenidos exitosamente',
        count: records.length,
        data: records,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;

      const record = await spHistoryService.findByUuid(uuid);
      if (!record) {
        return res.status(404).json({
          error: 'Registro no encontrado',
        });
      }

      await spHistoryService.delete(uuid);

      res.json({
        message: 'Registro eliminado exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new SpHistoryController();
