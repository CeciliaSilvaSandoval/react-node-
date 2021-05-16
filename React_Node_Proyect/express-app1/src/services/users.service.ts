
import {getRepository}  from 'typeorm'
import {handleAsync} from '../shared/utilities'
import {Service} from './index.service'
//We are going to overwrite what change 
class UserService extends Service{

    find=async( )=>{
        let [items, error] = await handleAsync(getRepository(this.entity).find({relations: ["address", "company"]}));
         if (error) return new Error(error.message);
         return items;
    }
    findOne=async(id:string)=>{
        let [item, error] = await handleAsync(getRepository(this.entity).findOne(id,{relations: ["address", "company"]}));
    
         if (error) return new Error(error.message);
         return item;
    }
    update=async(id:string, data:any)=>{
        const modData = { id:Number(id), ...data};

        // let [response, error] = await handleAsync(getRepository(this.entity).update(id, data));
        let [item, error] = await handleAsync(getRepository(this.entity).save(modData));
        if (error) return new Error(error.message);

        let [updatedItem, error2] = await handleAsync(getRepository(this.entity).findOne(id,{relations: ["address", "company"]}));
        if (error2) return new Error(error.message);
        return updatedItem;
    }

}
export default UserService ;