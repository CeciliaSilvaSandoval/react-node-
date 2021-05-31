import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { DataValidationError } from '../shared/error';

export const validationMiddleware = ( validator: any, option = {} ): RequestHandler => {

    return (request: Request, response: Response, next:NextFunction) => {

        validate( plainToClass(validator, request.body), {skipMissingProperties: true})
            .then( (valerrors: ValidationError[]) => {

                if (valerrors.length){
                
                    // // Handle errors have
                    const messsages = valerrors.map((valerror: ValidationError) => {
                        // console.log(`Validation Errors : `, valerrors);

                        const constraints: any = valerror.constraints ? valerror.constraints : null;

                        // Deal with nestedchildren error (if any)
                        const nestedmessages: any = valerror.children?.map( (err: ValidationError) => {
                            // console.log(`Nested Validation Errors : `, err);
                            const nestedconstraints: any = err.constraints? err.constraints : null;
                            if ( nestedconstraints ) return Object.values(nestedconstraints).join(`, `);
                        })

                        if ( nestedmessages?.length ) return nestedmessages;

                        if ( constraints ) return Object.values(constraints); 

                    }).join(`,`)

                    // return response.send(`Validation errors : ${messsages}`);
                    next ( new DataValidationError(messsages));
                    
                } else {
                    // No errors, handle to netx middleware
                    next();
                }
            })
            .catch( error => {
                throw error;
            })
    }
}
