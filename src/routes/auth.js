import { Router } from 'express';

export default (app) => {
  const router = Router();
  const { AuthController } = app.controllers;
  const { ValidationMiddleware } = app.middlewares;
  return router
    .post('/sign-in', ValidationMiddleware.signIn, AuthController.signIn)
    .post('/sign-up', ValidationMiddleware.signUp, ValidationMiddleware.verifyEmail, AuthController.signUp);
};
