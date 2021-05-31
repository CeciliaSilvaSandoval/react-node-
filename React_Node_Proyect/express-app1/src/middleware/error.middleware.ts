import express, { Request, Response, NextFunction} from 'express';

import {Service} from '../services/index.service'
import Log from '../models/log.entity';
import {handleAsync} from '../shared/utilities'

const registerErrorHandlingMiddleware = ( server: express.Application ) => {
    
    //error handling middleware
    server.use (async (error: any, request: Request, response: Response, next: NextFunction) => {

        const _service = new Service(Log);

        let origin = error.origin || `unknown`;
        let status = error.status || 500;
        let message = error.message || `Something went wrong! :(`;
    
        response 
            .status( status )
            .send( {status, message} )   
        
        // log errors to persistance layer
        let [newItem, error2] = await handleAsync(_service.create({origin,status,message}));
        if (error2) console.log(`Error handler : `, error2);
        // console.log(`Error handler : `, origin, status, message);

    }); 
    
}

export default registerErrorHandlingMiddleware;
