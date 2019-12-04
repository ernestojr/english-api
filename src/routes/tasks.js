import { Router } from 'express';

export default (app) => {
  const router = Router();
  const { TaskController } = app.controllers;
  return router
    .post('/', TaskController.create)
    .get('/', TaskController.get)
    .get('/:id', TaskController.getById)
    .put('/:id', TaskController.updateById)
    .delete('/:id', TaskController.deleteById);
};
