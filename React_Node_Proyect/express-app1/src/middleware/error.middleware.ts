import express, { Request, Response, NextFunction} from 'express';

const registerErrorHandlingMiddleware = ( server: express.Application ) => {
    
    //error handling middleware
    server.use ((error: any, request: Request, response: Response, next: NextFunction) => {
        
        let origin=error.origin;
        let status = error.status || 500;
        let message = error.message || `Something went wrong! :(`;

        // console.log(`Error handler : `,origin ,status,message);
         
        response 
            .status( status )
            .send( {status, message} )  
    }); 
    
}

export default registerErrorHandlingMiddleware;
