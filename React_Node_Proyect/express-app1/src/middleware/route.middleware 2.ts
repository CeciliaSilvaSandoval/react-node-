import { Application, Request, Response, NextFunction } from 'express';
import path from 'path';

import { IRoute } from '../routes/index.route';

import {APINotImplementedError,RouteNotImplementedError} from '../shared/error'

const registerRouteMiddleware = ( server: Application, routes: IRoute[] ) => {

    // register API routes
    routes.forEach( (route: IRoute) => {
        server.use(route.api, route.router);
    });

}

const registerUnhandleRoutesMiddleware = ( server: Application ) => {
    
    // All API requests not hadled before
    server.all(`/api/*`, (request: Request, response: Response) => {
      
        // response.send(`Api ${request.path} not implemented!`);
        throw new APINotImplementedError(request.path)
      });

    // All GET request (Non-API) will return React app
    server.get(`*`, (request: Request, response: Response) => {
        response.sendFile(path.resolve(__dirname, `../../../react-app/build`, `index.html`));
      });
    
    // Handle unhandled API requests
    server.use( (request: Request, response: Response, netx: NextFunction) => {
          throw new RouteNotImplementedError(request.path)
      });
} 

export { registerRouteMiddleware, registerUnhandleRoutesMiddleware };