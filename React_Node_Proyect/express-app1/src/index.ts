// Reads enviroment variables
import 'dotenv/config';
import Server from './server';
// import PostsRoute from './routes/posts.route';
// import UsersRoute from './routes/users.route';
import {Route} from './routes/index.route'
import UsersRoute from './routes/user.route'
import {Service} from './services/index.service'
import UserService from './services/users.service'
import Post from './models/post.entity'
import User from './models/user.entity'

// initialize server
const postRoute=new Route().register('/api/posts',new Service(Post));
//El uso de diferentes rutas ayuda a darle otra forma a las rutas y servicios personalizados 
const userRoute=new UsersRoute().register('/api/users',new UserService(User));
const server = new Server( 
    [
        // new PostsRoute(),
        // new UsersRoute()
        postRoute,
        userRoute
    ]
);
// Run server 
server.listen();