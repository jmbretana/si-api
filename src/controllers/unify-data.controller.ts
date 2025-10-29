import { Request, Response, NextFunction } from "express";
import UnifyService from "../services/unify.service";

class unifyController {
  async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const unify = await UnifyService.getCurrent();
      console.log(unify);
      if (!unify) {
        return res.status(404).json({
          error: "No se encontraron registros",
        });
      }

      res.json({
        message: "Unify actual obtenida exitosamente",
        data: unify,
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

      const newOri = await UnifyService.create(req.body);

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
      const ori = await UnifyService.getLast();

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
      const { ori, sp, fc, oriSeconds, spSeconds, fcSeconds } = req.body;

      if (ori === undefined || sp === undefined || fc === undefined) {
        return res.status(400).json({
          error: "Los campos ori, sp y fc son requeridos",
        });
      }

      const updatedUnify = await UnifyService.update({
        ori,
        oriSeconds,
        sp,
        spSeconds,
        fc,
        fcSeconds,
      });

      res.json({
        message: "Unify actualizada exitosamente",
        data: updatedUnify,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new unifyController();
