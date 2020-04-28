import { Router } from 'express';

export default (app) => {
  const router = Router();
  const { PhaseController } = app.controllers;
  return router
    .post('/', PhaseController.create)
    .get('/', PhaseController.get)
    .get('/:id', PhaseController.getById)
    .put('/:id', PhaseController.updateById)
    .delete('/:id', PhaseController.deleteById);
};
