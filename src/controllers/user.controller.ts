import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: 'Email y password son requeridos',
        });
      }

      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          error: 'Ya existe un usuario con este email',
        });
      }

      const newUser = await userService.create({ email, password });

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        data: {
          _id: newUser._id,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();

      res.json({
        message: 'Usuarios obtenidos exitosamente',
        count: users.length,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.findById(id);

      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
        });
      }

      res.json({
        message: 'Usuario obtenido exitosamente',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { email } = req.body;

      const user = await userService.findById(id);
      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
        });
      }

      const updatedUser = await userService.update(id, { email });

      res.json({
        message: 'Usuario actualizado exitosamente',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await userService.findById(id);
      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
        });
      }

      await userService.delete(id);

      res.json({
        message: 'Usuario eliminado exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
