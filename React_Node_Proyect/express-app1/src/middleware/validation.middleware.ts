import {Request,Response,NextFunction} from 'express';

import {validate, ValidationError} from 'class-validator';
//convierte el objeto a clase
import {plainToClass} from 'class-transformer';

import {DataValidationError} from '../shared/error'

export const validationMiddleware=(dto:any)=>{
    return (request:Request, response:Response, next: NextFunction) => {  
            validate(plainToClass(dto,request.body)).
            then((errors: ValidationError[])=>{
                console.log(`List of errors`,errors);

                if(errors.length){
                    console.log(`Validation errors`,errors);

                    //handle errors here
                    const message = errors.map((error:ValidationError)=>{
                        const  constraints:any = error.constraints? error.constraints:null;
                        return Object.values(constraints);
                    }).join (', ')
                    next( new DataValidationError(message));
                }else {
                    console.log(`No Validation errors!`)
                    //no errors, handle to next middleware
                    next();
                }

            });
    }
}

