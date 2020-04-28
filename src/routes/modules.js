import { Router } from 'express';

export default (app) => {
  const router = Router();
  const { ModuleController } = app.controllers;
  return router
    .post('/', ModuleController.create)
    .get('/', ModuleController.get)
    .get('/:id', ModuleController.getById)
    .put('/:id', ModuleController.updateById)
    .delete('/:id', ModuleController.deleteById);
};
