import express, { Request, Response, NextFunction} from 'express';

// const registerErrorHandlingMiddleware = ( error: any, request: Request, response: Response, next: NextFunction ) => {
//     server.use( (error: any, req: any, res: any, next: any) => {
//         console.log(`Unhandled Error : `, error);
//         res.send(`Unhandled Error, Plase try again!`);
   
   
// }
// los errores seran formateados y enviados al cliente 
const registerErrorHandlingMiddleware = ( server: express.Application ) => {
    // error handling MIDDLEWARE
    server.use( (error: any, req: any, res: any, next: any) => {
        let status = error.status || 500;
        let message = error.message || `Something went wrong! :(`;
        res 
            // .status( status )
            .send( {status,message} )
    });
}

export default registerErrorHandlingMiddleware;
