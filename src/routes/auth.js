import { Router } from 'express';

export default (app) => {
  const router = Router();
  const { AuthController } = app.controllers;
  return router
    .post('/sign-in', AuthController.signIn)
    .post('/sign-up', AuthController.signUp);
};
