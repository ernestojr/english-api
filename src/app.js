import express, { json } from 'express';
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

// Importing routes

import modules from './routes/modules';
import phases from './routes/phases';
import practices from './routes/practices';

// Importing controllers

import ModuleController from './controllers/ModuleController';
import PhaseController from './controllers/PhaseController';
import PracticeController from './controllers/PracticeController';

// Importing services

import ModuleService from './services/ModuleService';
import PhaseService from './services/PhaseService';
import PracticeService from './services/PracticeService';
import UtilService from './services/UtilService';

// Exception

import Exception from './core/Exception';

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
    this.app.use(json());
  }

  models() {
    this.models = {
      Practice: new Practice(this).build(),
      Phase: new Phase(this).build(),
      Module: new Module(this).build(),
    };
  }

  services() {
    this.services = {
      ModuleService: new ModuleService(this),
      PhaseService: new PhaseService(this),
      PracticeService: new PracticeService(this),
      UtilService: new UtilService(this),
    };
  }

  controllers() {
    this.controllers = {
      ModuleController: new ModuleController(this),
      PhaseController: new PhaseController(this),
      PracticeController: new PracticeController(this),
    };
  }

  routes() {
    this.app.use('/modules', modules(this));
    this.app.use('/phases', phases(this));
    this.app.use('/practices', practices(this));
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
