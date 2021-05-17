import express, { Request, Response, NextFunction} from 'express';

const registerErrorHandlingMiddleware = ( server: express.Application ) => {
    
    //error handling middleware
    server.use ((error: any, request: Request, response: Response, next: NextFunction) => {
        
        console.log(`Error handler : `, error);
        let status = error.status || 500;
        let message = error.message || `Something went wrong! :(`;
        
        response 
            // .status( status )
            .send( {status, message} )  
    }); 
    
}

export default registerErrorHandlingMiddleware;
