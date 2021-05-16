import express,{NextFunction, Request,Response,Router} from 'express'
import {handleAsync} from '../shared/utilities'
import { IService } from '../services/index.service'


interface IRoute {
    api: string;
    router: Router;
}

class Route implements IRoute{

    api!:string;
    router:Router=express.Router();
    protected service!:IService;

    register=(api:string,service:IService): IRoute =>{
        this.api=api;
        this.service=service;

        this.router.post('/',this.post);
        this.router.get('/',this.get);
        this.router.get('/:id',this.getOne);
        this.router.patch('/:id',this.patch);
        this.router.delete('/:id',this.delete);
        return this;
    }

    protected post= async (req:Request, res:Response, next:NextFunction) => {

        const data = req.body;

        let [newItem, error] = await handleAsync(this.service.create(data));

        if (error) return res.send(error);
        res.json(newItem);
    }
    protected get= async (req:Request, res:Response, next:NextFunction) => {

        const data = req.body;
        let [items, error] = await handleAsync(this.service.find());

        if (error) return res.send(error);
        res.json(items);
    }
    protected getOne= async (req:Request, res:Response, next:NextFunction) => {

        const id = req.params.id;
        let [item, error] = await handleAsync(this.service.findOne(id));

        if (error) return res.send(error);

        if (item) {
            res.json(item);
        } else {
            res.send(`No item found for ${id}!`);
        }
    }
    protected patch= async (req:Request, res:Response, next:NextFunction) => {
        const id = req.params.id;
        const data=req.body
        let [updatedItem, error] = await handleAsync(this.service.update(id,data));

        if (error) return res.send(error);

        if (updatedItem) {
            res.json(updatedItem);
        } else {
            res.send(`No item found for ${id}!`);
        }
    }
    protected delete= async (req:Request, res:Response, next:NextFunction) => {
        const id = req.params.id;
 
        let [deleteResponse, error] = await handleAsync(this.service.delete(id));

        if (error) return res.send(error);

        if (deleteResponse.affected === 1){
            res.send({deleted: true});
        } else {
            res.send(`No item found for ${id}!`);
        }
    }

}

export  {IRoute , Route }; 