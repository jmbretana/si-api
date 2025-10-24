import { Request, Response, NextFunction } from "express";
import oriService from "../services/ori.service";

class OriController {
  async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const ori = await oriService.getCurrent();

      if (!ori) {
        return res.status(404).json({
          error: "No se encontró registro de ORI",
        });
      }

      res.json({
        message: "ORI actual obtenida exitosamente",
        data: ori,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { ori, oriSeconds, timeStamp } = req.body;

      if (ori === undefined || oriSeconds === undefined) {
        return res.status(400).json({
          error: "Todos los campos son requeridos",
          required: ["ori", "oriSeconds"],
        });
      }

      const newOri = await oriService.create(req.body);

      res.status(201).json({
        message: "Registro de ORI creado exitosamente",
        data: newOri,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLast(req: Request, res: Response, next: NextFunction) {
    try {
      const ori = await oriService.getLast();

      if (!ori) {
        return res.status(404).json({
          error: "No se encontró registro de ORI",
        });
      }

      res.json({
        message: "ORI actual obtenida exitosamente",
        data: ori,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { ori, oriSeconds } = req.body;
      console.log(ori, oriSeconds);

      if (ori === undefined || oriSeconds === undefined) {
        return res.status(400).json({
          error: "Los campos ori y oriSeconds son requeridos",
        });
      }

      const updatedOri = await oriService.update({ ori, oriSeconds });

      res.json({
        message: "ORI actualizada exitosamente",
        data: updatedOri,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new OriController();
