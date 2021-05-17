import express, { Request, Response, NextFunction, Router } from 'express';

import { handleAsync } from '../shared/utilities';
import { IService } from '../services/index.service';

interface IRoute {
    api: string;
    router: Router;
    register: ( api: string, service: IService) => IRoute;
}

class Route implements IRoute{
    
    api!: string;
    router: Router = express.Router();
    protected service!: IService; 

    register = ( api: string, service: IService ): IRoute => {

        this.api = api;
        this.service = service;

        this.router.post(`/`, this.post);
        this.router.get(`/`, this.get);
        this.router.get(`/:id`, this.getOne);
        this.router.patch(`/:id`, this.patch);
        this.router.delete(`/:id`, this.delete);
        return this;
    }

    protected post = async( request: Request, response:Response, next:NextFunction ) => {

        const data = request.body;

        let [newItem, error] = await handleAsync(this.service.create(data));
        
        if (error) return next( error );
        response.json(newItem);
    }

    protected get = async( request: Request, response:Response, next:NextFunction ) => {

        let getOption = null;

        let [items, error] = await handleAsync(this.service.find(getOption));

        if (error) return next( error );
        response.send(items);
    }

    protected getOne = async( request: Request, response:Response, next:NextFunction ) => {

        const id = request.params.id;

        let [item, error] = await handleAsync(this.service.findOne(id));

        if (error) return next( error );
        if (item) {
            response.json(item);
        } else {
            response.send(`No item found for ${id}!`);
        }
    }

    protected patch = async( request: Request, response:Response, next:NextFunction ) => {
        const id = request.params.id;
        const data = request.body;
    
        let [updatedItem, error] = await handleAsync(this.service.update(id, data));

        if (error) return next( error );
        if (updatedItem) {
            response.send(updatedItem);
        } else {
            response.send(`No item found for ${id}!`);
        }
    }

    protected delete = async( request: Request, response:Response, next:NextFunction ) => {

        const id = request.params.id;
    
        let [deleteResponse, error] = await handleAsync(this.service.delete(id));

        if (error) return next( error );
        if (deleteResponse.affected === 1){
            response.send({deleted: true});
        } else {
            response.send(`No item found for ${id}!`);
        }
    
    }

}

export { IRoute, Route}; 