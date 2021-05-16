import { Application, NextFunction, Request, Response } from 'express';
import path from 'path'

import { IRoute } from '../routes/index.route';
//ALGUIEN PREGUNTA POR LOS ENDPOINTS
const registerRoutegMiddleware = (server: Application, routes: IRoute[]) => {

    // register  API routes
    routes.forEach((route: IRoute) => {
        server.use(route.api, route.router);
    });

}
const registerUnhandledRoutesMiddleware = (server: Application) => {
    //HANDLE UNHANDLED GET REQUESTS & RETURN REACT APP
    server.get(`*`, (req: Request, res: Response) => {
        // LE VOY A DAR EL INDEX DEL BUILD
        res.sendFile(path.resolve(__dirname, '../../../react-app/build', 'index.html'));
    });

     // HANDLE UNHANDLES API REQUESTS 
     server.use( (req: Request, res: Response, next:NextFunction) => {
        res.send(`API ${req.path} not implemented`)
        next( );
      });
}

export { registerRoutegMiddleware, registerUnhandledRoutesMiddleware };