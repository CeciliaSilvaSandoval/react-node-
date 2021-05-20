import {Application, Request,Response,NextFunction} from 'express';

const registerLoggingMiddleware = ( server: Application ) => {

    // loggin middleware
    server.use( (request:Request, response:Response, next:NextFunction) => {
    console.log(`${request.method} ${request.path}`);
    next( );
  });

}

export default registerLoggingMiddleware;