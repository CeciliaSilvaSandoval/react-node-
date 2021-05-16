
import {getRepository}  from 'typeorm'
import {handleAsync} from '../shared/utilities'

interface IService {
    create:(data:any)=> Promise<any>;
    find:( )=> Promise<any>;
    findOne:(id:string)=> Promise<any>;
    update:(id:string, data:any)=> Promise<any>;
    delete:(id:string)=> Promise<any>;
}
class Service implements IService{
    entity:any;
    constructor (entity:any){
        this.entity=entity;
    }
    create=async(data:any)=>{
        const newItem = getRepository(this.entity).create( data );
        let [item, error] = await handleAsync(getRepository(this.entity).save(newItem));

        if (error) return new Error(error.message);
        return item;
    }
    find=async( )=>{
        let [items, error] = await handleAsync(getRepository(this.entity).find());
         if (error) return new Error(error.message);
         return items;

    }
    findOne=async(id:string)=>{
        let [item, error] = await handleAsync(getRepository(this.entity).findOne(id));
    
         if (error) return new Error(error.message);
         return item;
    }
    update=async(id:string, data:any)=>{
        let [response, error] = await handleAsync(getRepository(this.entity).update(id, data));
        if (error) return new Error(error.message);

        let [updatedItem, error2] = await handleAsync(getRepository(this.entity).findOne(id));
        if (error2) return new Error(error.message);
        return updatedItem;

    }
    delete=async(id:string)=>{
        let [response, error] = await handleAsync(getRepository(this.entity).delete(id));
         if (error) return new Error(error.message);
         return response;
    }
}
export {IService, Service };