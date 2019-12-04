import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import methodOverride from 'method-override';

import env from './config/env';
import database from './config/database';
import web from './config/web';
import logger from './config/logger';

// Importing models

import Project from './models/Project';
import Task from './models/Task';

// Importing routes

import index from './routes/index';
import projects from './routes/projects';
import tasks from './routes/tasks';

// Importing controllers

import ProjectController from './controllers/ProjectController';
import TaskController from './controllers/TaskController';

// Importing services

import TaskService from './services/TaskService';
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
    this.log = logger;
  }

  setting() {
    this.Exception = Exception;
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
    };
  }

  services() {
    this.services = {
      TaskService: new TaskService(this),
      ProjectService: new ProjectService(this),
      UtilService: new UtilService(this),
    };
  }

  controllers() {
    this.controllers = {
      TaskController: new TaskController(this),
      ProjectController: new ProjectController(this),
    };
  }

  routes() {
    this.app.use('/', index(this));
    this.app.use('/projects', projects(this));
    this.app.use('/tasks', tasks(this));
  }

  errorHandler() {
    this.app.use((err, req, res, next) => {
      const { message, statusCode } = err;
      this.log.error(message);
      res.status(statusCode || 500).json({ message });
    });
  }

  async start() {
    const port = this.app.get('port');
    await database(this);
    await this.app.listen(port);
    this.log.info(`Server in port ${port}`);
  }
}

export default Application;
