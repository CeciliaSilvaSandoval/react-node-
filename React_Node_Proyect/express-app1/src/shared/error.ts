
class ExtendedError extends Error{
    
    status: number;
    origin: string;

    constructor (status: number,origin:string, message:string ){
        super (message)
        this.status = status;
        this.origin =origin
    }

}

export class AdaptorError extends ExtendedError{

    constructor (error:any){
        super(500,'Service Layer', `Server error : ${error}`);
    }
}

export class EntityNotFoundError extends ExtendedError{

    constructor (id:string ){
        // Somebody give me a rong id
        super(400,'Route Layer',`entity with id: ${id},  Not found!`  );
    }
}
export class APINotImplementedError extends ExtendedError{

    constructor (route:string ){
        // Somebody give me a rong id
        super(400,'Middleware',`API with rout: ${route},  Not implemented!`  );
    }
}

export class RouteNotImplementedError extends ExtendedError{
// not existing route with that metod in route.middleware, only get  
    constructor (route:string ){
        super(400,'Middleware',`Route: ${route},  Not implemented!`  );
    }
}


export class PersistenceConnectivityError extends ExtendedError{
    // cannoot be coonnected with the database
        constructor (error:any ){
            super(500,'Aplication Layer',`Conectivity fail ; ${error.message}`  );
        }
    }