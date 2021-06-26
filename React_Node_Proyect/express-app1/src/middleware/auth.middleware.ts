import { Request, Response, NextFunction, RequestHandler } from 'express';
var nJwt = require('njwt');

import { AuthError } from '../shared/error';

export const authMiddleware = (): RequestHandler => {

    return (request: Request, response: Response, next: NextFunction) => {

        // Retrive  token from header
        const token = request.header(`AUTH_TOKEN`);

        if (token) {
            // Verify token in not tampere!
            nJwt.verify(token,`xxx`,
            (error:any,jwt:any)=>{
                if (error){
                    next(new AuthError(error.message));
                }else{
                    //jwt token valid!!
                    next();
                }
            });


        } else {
            next(new AuthError(`Unauthorized access!! No token provided`));
        }
    }
}