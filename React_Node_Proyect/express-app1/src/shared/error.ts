
class ExtendedError extends Error{
    
    status: number;

    constructor (status: number, message:string ){
        super (message)
        this.status = status;
    }

}

export class AdaptorError extends ExtendedError{

    constructor (error:any){
        super(500, `Server error : ${error.message}`);
    }
}