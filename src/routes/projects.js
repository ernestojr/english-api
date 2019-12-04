import { Router } from 'express';

export default (app) => {
  const router = Router();
  const { ProjectController } = app.controllers;
  return router
    .post('/', ProjectController.create)
    .get('/', ProjectController.get)
    .get('/:id', ProjectController.getById)
    .put('/:id', ProjectController.updateById)
    .delete('/:id', ProjectController.deleteById);
};
