import { getRepository } from "typeorm";

import { handleAsync } from "../shared/utilities";
import { Service } from "./index.service";
import { AdaptorError } from '../shared/error';

class UsersService extends Service{

    find = async( options: any ) => {

        let [items,error] =[null, null];

        if ( options ) {
            [items,error] = await handleAsync(
                getRepository(this.entity)
                .createQueryBuilder(`user`)
                .leftJoinAndSelect(`user.address`, `address`)
                .leftJoinAndSelect(`user.company`, `company`)
                .where(`user.name ilike :name`, {name: `%${options}%`})
                .getMany()
            );
        } else {
            [items, error] = await handleAsync(getRepository(this.entity).find( {relations: ["address", "company"]} ));
        }

        if (error) throw new AdaptorError(error);
        return items;
    }

    findOne = async( id: string ) => {

        let [item, error] = await handleAsync(getRepository(this.entity).findOne( id, {relations: ["address", "company"]} ));

        if ( error ) throw new AdaptorError(error);
        return item  
    }

    update = async( id: string, data:any ) => {

        const modData = { id: Number(id), ...data};

        let [item, error] = await handleAsync(getRepository(this.entity).save(modData));
        // let [response, error] = await handleAsync(getRepository(this.entity).update(id, data));
        if ( error ) throw new AdaptorError(error);

        let [updatedItem, error2] = await handleAsync(getRepository(this.entity).findOne(id, {relations: ["address", "company"]}));
        if ( error2 ) throw new AdaptorError(error);

        return updatedItem;

    }
}

export default UsersService;