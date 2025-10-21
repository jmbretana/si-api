const oriService = require('../services/ori.service');

class OriController {
  async create(req, res, next) {
    try {
      const { id, ori, oriSeconds, username } = req.body;

      if (!id || !ori || !oriSeconds || !username) {
        return res.status(400).json({
          error: 'Todos los campos son requeridos',
          required: ['id', 'ori', 'oriSeconds', 'username'],
        });
      }

      const existingOri = await oriService.findById(id);
      if (existingOri) {
        return res.status(409).json({
          error: 'Ya existe un registro con este ID',
        });
      }

      const newOri = await oriService.create(req.body);

      res.status(201).json({
        message: 'Registro creado exitosamente',
        data: newOri,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const oris = await oriService.findAll();

      res.json({
        message: 'Registros obtenidos exitosamente',
        count: oris.length,
        data: oris,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const ori = await oriService.findById(id);

      if (!ori) {
        return res.status(404).json({
          error: 'Registro no encontrado',
        });
      }

      res.json({
        message: 'Registro obtenido exitosamente',
        data: ori,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { username } = req.body;

      if (!username) {
        return res.status(400).json({
          error: 'El campo username es requerido para la auditoría',
        });
      }

      const ori = await oriService.findById(id);
      if (!ori) {
        return res.status(404).json({
          error: 'Registro no encontrado',
        });
      }

      const updatedOri = await oriService.update(id, req.body);

      res.json({
        message: 'Registro actualizado exitosamente',
        data: updatedOri,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const ori = await oriService.findById(id);
      if (!ori) {
        return res.status(404).json({
          error: 'Registro no encontrado',
        });
      }

      await oriService.delete(id);

      res.json({
        message: 'Registro eliminado exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OriController();
