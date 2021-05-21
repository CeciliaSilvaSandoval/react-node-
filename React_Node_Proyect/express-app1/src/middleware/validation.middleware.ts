import { Request, Response, NextFunction } from 'express';

import { validate, ValidationError } from 'class-validator';
//convierte el objeto a clase
import { plainToClass } from 'class-transformer';

import { DataValidationError } from '../shared/error'

export const validationMiddleware = (validator: any, option={}) => {
    return (request: Request, response: Response, next: NextFunction) => {
        validate(plainToClass(validator, request.body),option).
            then((valerrors: ValidationError[]) => {
                console.log(`List of errors`, valerrors);

                if (valerrors.length) {
                    //     //handle errors here
                    const messages = valerrors.map((valerror: ValidationError) => {
                        console.log(`Validation errors`, valerror);

                        const constraints: any = valerror.constraints ? valerror.constraints : null;
                        //Deal with the nestesd/children errors (if any )
                        const nestedmessages: any = valerror.children?.map((error: ValidationError) => {
                            const nestedconstraints: any = error.constraints ? error.constraints : null;
                            if (nestedconstraints) return Object.values(nestedconstraints);
                        }).join(`, `)

                        if (constraints) {
                            let msg = nestedmessages ? Object.values(constraints) + `, ` + nestedmessages : Object.values(constraints);
                            return msg
                        } else return nestedmessages;


                    }).join(`, `)
                    // return response.send(`Validation errors:${messages}`)
                    next(new DataValidationError(messages));

                } else {
                    // console.log(`No Validation errors!`)
                    //no errors, handle to next middleware
                    next();
                }

            }).catch(error => {
                throw error;
            })

    }
}

