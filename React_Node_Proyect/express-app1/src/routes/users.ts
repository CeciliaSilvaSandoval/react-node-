
// import express from 'express';
// import { getRepository } from 'typeorm'; 

// import Users from '../models/user.entity';

// let usersRouter = express.Router();


// // Create a User
// usersRouter.post('/', async (req, res) => {

//     const data = req.body;

//     const newUser = getRepository(Users).create( data );
//     let [user, error] = await handleAsync(getRepository(Users).save(newUser));
//     if (error) return res.send(error);

//     res.send(user);
// });

// // Read all User
// usersRouter.get('/', async (req, res) => {

//     let [users, error] = await handleAsync(getRepository(Users).find( {relations: ["address", "company"]} ));
//     if (error) return res.send(error);

//     res.send(users);
// });

// // Read single User based on id
// usersRouter.get('/:id', async (req, res) => {

//     const id = req.params.id;

//     let [user, error] = await handleAsync(getRepository(Users).findOne(id, {relations: ["address", "company"]}));
//     if (error) return res.send(error);

//     if (user) {
//         res.send(user);
//     } else {
//         res.send(`No user found for ${id}!`);
//     }
// });

// // Update single User based on id
// usersRouter.patch('/:id', async (req, res) => {

//     const id = Number(req.params.id);
//     // const data = req.body;
//     const data = { id:id, ...req.body};

//     // let [response, error] = await handleAsync(getRepository(Users).update(id, data));
//     let [user, error] = await handleAsync(getRepository(Users).save(data));
//     if (error) return res.send(error);

//     let [updatedUser, error2] = await handleAsync(getRepository(Users).findOne(id, {relations: ["address", "company"]}));
//     if (error2) return res.send(error2);

//     if (updatedUser) {
//         res.send(updatedUser);
//     } else {
//         res.send(`No user found for ${id}!`);
//     }
  
// });

// // Delete single User based on id
// usersRouter.delete('/:id', async (req, res) => {

//     const id = req.params.id;
    
//     let [response, error] = await handleAsync(getRepository(Users).delete(id));
//     if (error) return res.send(error);

//     if (response.affected === 1){
//         res.send({deleted: true});
//     } else {
//         res.send(`No user found for ${id}!`);
//     }
// });

// const handleAsync = (promise: Promise<any>) => {
//     return promise
//         .then( (data: any) => ([data, null]) )
//         .catch( (error: any) => ([null, error]) )
// }

// export default usersRouter;
