import { Router } from 'express';

export default (app) => {
  const router = Router();
  const { WordController } = app.controllers;
  return router
    .post('/', WordController.create)
    .get('/', WordController.get)
    .get('/:id', WordController.getById)
    .put('/:id', WordController.updateById)
    .delete('/:id', WordController.deleteById);
};
