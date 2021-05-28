import {Application, Request,Response,NextFunction, RequestHandler} from 'express';
import mung from 'express-mung';
var js2xmlparser = require('js2xmlparser')

const responseFormatterMiddleware = ( server: Application ) => {

    // loggin middleware
    server.use(mung.json(
        function transform(body:any, request:Request,response:Response): RequestHandler{
            const format =request.header("responseFormat");
            if (format ==='xml'){
               body= js2xmlparser.parse(`result`,body)
            }
            console.log('responseFormatterMiddleware: ',format, body);
            return body;
        }
    ));

}

export default responseFormatterMiddleware;