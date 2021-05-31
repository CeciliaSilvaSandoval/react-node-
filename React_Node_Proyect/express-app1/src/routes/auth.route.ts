import express, { Request, Response, NextFunction, Router } from 'express';

import { handleAsync } from '../shared/utilities';
import { IService } from '../services/index.service';
import { IRoute, Route } from './index.route';
import { validationMiddleware } from '../middleware/validation.middleware';
import { AuthUserValidator} from '../models/users.validator';

class AuthRoute extends Route{

    register = ( api: string, service: IService ): IRoute => {

        this.api = api;
        this.service = service;

        this.router.post(`/`,validationMiddleware(AuthUserValidator), this.post);
        return this;
    }
    protected post = async( request: Request, response:Response, next:NextFunction ) => {

        const data = request.body;

        let [newItem, error] = await handleAsync(this.service.find({where:data}));
        
        if (error) return next( error );

        if (newItem.length){
            //User is authenticated
            //Create a jwt token & SEND IT ALOING WITH THE RESPONESE 
        }
        
        response.json(newItem);
    }
}

export default AuthRoute; 