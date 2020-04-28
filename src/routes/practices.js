import { Router } from 'express';

export default (app) => {
  const router = Router();
  const { PracticeController } = app.controllers;
  return router
    .post('/', PracticeController.create)
    .get('/', PracticeController.get)
    .get('/:id', PracticeController.getById)
    .put('/:id', PracticeController.updateById)
    .delete('/:id', PracticeController.deleteById);
};
