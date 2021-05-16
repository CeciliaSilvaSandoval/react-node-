import express from 'express';

import { IRoute } from './routes/index.route';
import registerCommonMiddleware from './middleware/common.middleware';
import registerLoggingMiddleware from './middleware/logging.middleware';
import { registerRoutegMiddleware, registerUnhandledRoutesMiddleware } from './middleware/route.middleware';
import registerErrorHandlingMiddleware from './middleware/error.middleware';
import { createConnection } from 'typeorm';
import config from './typeormconfig';


class Server {

  private server: express.Application;

  constructor(routes: IRoute[]) {
    this.server = express();

    this.connectToPersistence();
    this.registerMiddleware();
    this.registerRoutes(routes);
    this.registerErrorHandling();
  }

  // Agregando conexion con la base de datos 
  private async connectToPersistence() {
    try {
      await createConnection(config);
      console.log(`Persistence layer connected`);
    } catch (error) {
      console.log(`Error connectionf to Persistence layer  : `, error);
      return error;
    }
  }

  private registerMiddleware() {
    registerCommonMiddleware(this.server);
    registerLoggingMiddleware(this.server);
  }

  private registerRoutes(routes: IRoute[]) {
    registerRoutegMiddleware(this.server, routes);
  }

  private registerErrorHandling() {

    registerUnhandledRoutesMiddleware(this.server);
    registerErrorHandlingMiddleware(this.server);
  }

  listen() {
    this.server.listen(process.env.SERVER_PORT, () => {
      console.log(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
    });
  }
}

export default Server;
