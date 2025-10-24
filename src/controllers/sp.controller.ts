import { Request, Response, NextFunction } from "express";
import spService from "../services/sp.service";

class SpController {
  async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const sp = await spService.getCurrent();

      if (!sp) {
        return res.status(404).json({
          error: "No se encontró registro de SP",
        });
      }

      res.json({
        message: "SP actual obtenida exitosamente",
        data: sp,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLast(req: Request, res: Response, next: NextFunction) {
    try {
      const sp = await spService.getLast();

      if (!sp) {
        return res.status(404).json({
          error: "No se encontró registro de SP",
        });
      }

      res.json({
        message: "SP actual obtenida exitosamente",
        data: sp,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuid, sp, spSeconds, timeStamp } = req.body;

      if (!uuid || sp === undefined || spSeconds === undefined || !timeStamp) {
        return res.status(400).json({
          error: "Todos los campos son requeridos",
          required: ["uuid", "sp", "spSeconds", "timeStamp"],
        });
      }

      const newRecord = await spService.create(req.body);

      res.status(201).json({
        message: "Registro de SP creado exitosamente",

        data: newRecord,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { sp, spSeconds } = req.body;

      if (sp === undefined || spSeconds === undefined) {
        return res.status(400).json({
          error: "Los campos sp y spSeconds son requeridos",
        });
      }

      const updatedSp = await spService.update({ sp, spSeconds });

      res.json({
        message: "SP actualizada exitosamente",
        data: updatedSp,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new SpController();
