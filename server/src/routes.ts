import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesClassesController = new ClassesController();

const connectionsController = new ConnectionsController();

// Classes

// Index Classes
routes.get('/classes', classesClassesController.index);

// Create Class
routes.post('/classes', classesClassesController.create);


// Connections

// Index Connection
routes.get('/connections', connectionsController.index);

// Create Connection
routes.post('/connections', connectionsController.create);


export default routes;