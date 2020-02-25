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

import Project from './models/Project';
import Task from './models/Task';
import Module from './models/Module';

// Importing routes

import index from './routes/index';
import projects from './routes/projects';
import tasks from './routes/tasks';
import modules from './routes/modules';

// Importing controllers

import ProjectController from './controllers/ProjectController';
import TaskController from './controllers/TaskController';
import ModuleController from './controllers/ModuleController';

// Importing services

import TaskService from './services/TaskService';
import ModuleService from './services/ModuleService';
import ProjectService from './services/ProjectService';
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
        exposedHeaders: ['X-Pagination-Total-Count', 'X-Pagination-Limit'],
      }),
    );
    this.app.use(morgan('dev'));
    this.app.use(methodOverride());
    this.app.use(json());
  }

  models() {
    this.models = {
      Project: new Project(this).build(),
      Task: new Task(this).build(),
      Module: new Module(this).build(),
    };
  }

  services() {
    this.services = {
      TaskService: new TaskService(this),
      ModuleService: new ModuleService(this),
      ProjectService: new ProjectService(this),
      UtilService: new UtilService(this),
    };
  }

  controllers() {
    this.controllers = {
      ModuleController: new ModuleController(this),
      TaskController: new TaskController(this),
      ProjectController: new ProjectController(this),
    };
  }

  routes() {
    this.app.use('/', index(this));
    this.app.use('/projects', projects(this));
    this.app.use('/tasks', tasks(this));
    this.app.use('/modules', modules(this));
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
