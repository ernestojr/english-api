import { Router } from 'express';

export default (app) => {
  const router = Router();
  const { UserController } = app.controllers;
  return router
  .get('/me', UserController.getById)
  .put('/me', UserController.updateById);
};
