import { getRepository } from "typeorm";

import { handleAsync } from "../shared/utilities";
import { AdaptorError } from '../shared/error';

interface IService {
    create: ( data:any ) => Promise<any>;
    find: ( option: any ) => Promise<any>;
    findOne: (id: string ) => Promise<any>;
    update: ( id: string, data:any ) => Promise<any>;
    delete: ( id:string ) => Promise<any>;
}

class Service implements IService{

    entity: any;
    constructor( entity: any ){
        this.entity = entity;

    }

    create = async( data:any ) => {

        const newItem = getRepository(this.entity).create( data );
        let [item, error] = await handleAsync(getRepository(this.entity).save(newItem));

        if ( error ) throw new AdaptorError(error);
        return item
    }

    find = async( option: any ) => {

        let [items, error] = await handleAsync(getRepository(this.entity).find());

        if (error) throw new AdaptorError(error);
        return items;
    }

    findOne = async( id: string ) => {

        let [item, error] = await handleAsync(getRepository(this.entity).findOne(id));

        if ( error ) throw new AdaptorError(error);
        return item  
    }

    update = async( id: string, data:any ) => {

        let [response, error] = await handleAsync(getRepository(this.entity).update(id, data));
        if ( error ) throw new AdaptorError(error);

        let [updatedItem, error2] = await handleAsync(getRepository(this.entity).findOne(id));
        if ( error2 ) return new Error(error2.message);

        return updatedItem;

    }

    delete = async( id: string ) => {

        let [response, error] = await handleAsync(getRepository(this.entity).delete(id));
        if ( error ) throw new AdaptorError(error);

        return response;
    }
}

export { IService, Service };