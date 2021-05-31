import { Application, Request, Response, RequestHandler } from 'express';
import mung from 'express-mung';
var js2xmlparser = require("js2xmlparser");

const responseFormatterMiddleware = ( server: Application ) => {

    server.use(mung.json(
        function transform( body:any, request: Request, response:Response): RequestHandler{

            const format = request.header("ResponseFormat");

            if ( format == `xml`) {
                body = js2xmlparser.parse(`result`, body)
            }

            return body;
        } 
    ));
}

export default responseFormatterMiddleware;
