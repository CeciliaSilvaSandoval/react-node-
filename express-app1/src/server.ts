
import express from 'express';

import postsRouterv1 from './routes/posts';
import postsRouterv2 from './routes/post1';
import usersRouter from './routes/users';

const server = express( );
const port = 3002;

// loggin middleware
server.use( (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next( );
});

//register routers
server.use( '/v1/posts', postsRouterv1);
server.use( '/v2/posts', postsRouterv2);
server.use( '/v1/users', usersRouter);

server.get('/', (req, res) => {
  res.send('Grettings!');
});

server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
