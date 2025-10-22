import { Request, Response, NextFunction } from 'express';
import fcService from '../services/fc.service';

class FcController {
  async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const fc = await fcService.getCurrent();

      if (!fc) {
        return res.status(404).json({
          error: 'No se encontró registro de FC',
        });
      }

      res.json({
        message: 'FC actual obtenida exitosamente',
        data: fc,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { fc, fcSeconds } = req.body;

      if (fc === undefined || fcSeconds === undefined) {
        return res.status(400).json({
          error: 'Los campos fc y fcSeconds son requeridos',
        });
      }

      const updatedFc = await fcService.update({ fc, fcSeconds });

      res.json({
        message: 'FC actualizada exitosamente',
        data: updatedFc,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new FcController();
