
import { IService } from '../services/index.service';
import { IRoute, Route } from './index.route';
import { validationMiddleware } from '../middleware/validation.middleware';
import { LogValidator} from '../models/log.validator';

class LogsRoute extends Route{

    register = ( api: string, service: IService ): IRoute => {

        this.api = api;
        this.service = service;

        this.router.post(`/`,validationMiddleware(LogValidator), this.post);
        this.router.get(`/`, this.get);
        this.router.get(`/:id`, this.getOne);
        return this;
    }
}

export default LogsRoute; 