import { Request, Response, NextFunction } from 'express';
import oriHistoryService from '../services/ori-history.service';

class OriHistoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuid, ori, oriSeconds, timeStamp } = req.body;

      if (!uuid || ori === undefined || oriSeconds === undefined || !timeStamp) {
        return res.status(400).json({
          error: 'Todos los campos son requeridos',
          required: ['uuid', 'ori', 'oriSeconds', 'timeStamp'],
        });
      }

      const existingRecord = await oriHistoryService.findByUuid(uuid);
      if (existingRecord) {
        return res.status(409).json({
          error: 'Ya existe un registro con este UUID',
        });
      }

      const newRecord = await oriHistoryService.create(req.body);

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
      const records = await oriHistoryService.findAll(limit);

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
      const record = await oriHistoryService.findByUuid(uuid);

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

      const records = await oriHistoryService.findByDateRange(
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

      const record = await oriHistoryService.findByUuid(uuid);
      if (!record) {
        return res.status(404).json({
          error: 'Registro no encontrado',
        });
      }

      await oriHistoryService.delete(uuid);

      res.json({
        message: 'Registro eliminado exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new OriHistoryController();
