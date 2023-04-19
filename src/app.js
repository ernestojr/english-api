import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import methodOverride from 'method-override';

import env from './config/env';
import database from './config/database';
import web from './config/web';
import logger from './config/logger';

// Constants

import Constants from './constants';

// Importing models

import Practice from './models/Practice';
import Phase from './models/Phase';
import Module from './models/Module';
import Word from './models/Word';
import User from './models/User';

// Importing routes

import modules from './routes/modules';
import phases from './routes/phases';
import practices from './routes/practices';
import words from './routes/words';
import users from './routes/users';
import auth from './routes/auth';

// Importing controllers

import ModuleController from './controllers/ModuleController';
import PhaseController from './controllers/PhaseController';
import PracticeController from './controllers/PracticeController';
import WordController from './controllers/WordController';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

// Importing services

import ModuleService from './services/ModuleService';
import PhaseService from './services/PhaseService';
import PracticeService from './services/PracticeService';
import WordService from './services/WordService';
import UserService from './services/UserService';
import UtilService from './services/UtilService';
import AuthService from './services/AuthService';

// Exception

import Exception from './core/Exception';

// Middlewares

import ValidationMiddleware from './middlewares/ValidationMiddleware';

class Application {
  constructor() {
    this.app = express();
    this.env();
    this.logger();
    this.middlewares();
    this.setting();
    this.models();
    this.services();
    this.controllers();
    this.routersMiddleware();
    this.routes();
    this.errorHandler();
  }

  env() {
    this.env = env;
  }

  logger() {
    this.logger = logger;
  }

  setting() {
    this.Exception = Exception;
    this.Constants = Constants;
    this.app.set('port', web(this).port);
  }

  middlewares() {
    this.app.use(
      cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'],
        exposedHeaders: ['X-Pagination-Total-Count', 'X-Pagination-Limit', 'X-Pagination-Page'],
      }),
    );
    this.app.use(morgan('dev'));
    this.app.use(methodOverride());
    this.app.use(express.json());
  }

  models() {
    this.models = {
      Practice: new Practice(this).build(),
      Phase: new Phase(this).build(),
      Module: new Module(this).build(),
      Word: new Word(this).build(),
      User: new User(this).build(),
    };
  }

  services() {
    this.services = {
      ModuleService: new ModuleService(this),
      PhaseService: new PhaseService(this),
      PracticeService: new PracticeService(this),
      WordService: new WordService(this),
      UserService: new UserService(this),
      UtilService: new UtilService(this),
      AuthService: new AuthService(this),
    };
  }

  controllers() {
    this.controllers = {
      ModuleController: new ModuleController(this),
      PhaseController: new PhaseController(this),
      PracticeController: new PracticeController(this),
      WordController: new WordController(this),
      UserController: new UserController(this),
      AuthController: new AuthController(this),
    };
  }

  routersMiddleware() {
    this.middlewares = {
      ValidationMiddleware: new ValidationMiddleware(this),
    };
  }

  routes() {
    this.app.use('/modules', modules(this));
    this.app.use('/phases', phases(this));
    this.app.use('/practices', practices(this));
    this.app.use('/words', words(this));
    this.app.use('/users', users(this));
    this.app.use('/auth', auth(this));
  }

  errorHandler() {
    this.app.use((err, req, res, next) => {
      const { message, statusCode } = err;
      this.logger.error(message);
      res.status(statusCode || 500).json({ message });
    });
  }

  async start() {
    const port = this.app.get('port');
    await database(this);
    await this.app.listen(port);
    this.logger.info(`Server in port ${port}`);
  }
}

export default Application;
