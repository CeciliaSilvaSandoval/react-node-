// import express from 'express';
// import { getRepository } from 'typeorm'; 

// import Posts from '../models/post.entity';

// let postsRouterv1 = express.Router();

// // Create a Post
// postsRouterv1.post('/', async (req, res) => {

//     const data = req.body;

//     const newPost = getRepository(Posts).create( data );
//     let [post, error] = await handleAsync(getRepository(Posts).save(newPost));
//     if (error) return res.send(error);

//     res.send(post);
// });

// // Read all Posts
// postsRouterv1.get('/', async (req, res) => {

//     let [posts, error] = await handleAsync(getRepository(Posts).find());
//     if (error) return res.send(error);

//     res.send(posts);
// });

// // Read single Post based on id
// postsRouterv1.get('/:id', async (req, res) => {

//     const id = req.params.id;

//     let [post, error] = await handleAsync(getRepository(Posts).findOne(id));
    
//     if (error) return res.send(error);

//     if (post) {
//         res.send(post);
//     } else {
//         res.send(`No post found for ${id}!`);
//     }
// });

// // Update single Post based on id
// postsRouterv1.patch('/:id', async (req, res) => {

//     const id = req.params.id;
//     const data = req.body;

//     let [response, error] = await handleAsync(getRepository(Posts).update(id, data));
//     if (error) return res.send(error);

//     let [updatedPost, error2] = await handleAsync(getRepository(Posts).findOne(id));
//     if (error2) return res.send(error2);

//     if (updatedPost) {
//         res.send(updatedPost);
//     } else {
//         res.send(`No post found for ${id}!`);
//     }
  
// });

// // Delete single Post based on id
// postsRouterv1.delete('/:id', async (req, res) => {

//     const id = req.params.id;
    
//     let [response, error] = await handleAsync(getRepository(Posts).delete(id));
//     if (error) return res.send(error);

//     if (response.affected === 1){
//         res.send({deleted: true});
//     } else {
//         res.send(`No post found for ${id}!`);
//     }
// });

// const handleAsync = (promise: Promise<any>) => {
//     return promise
//         .then( (data: any) => ([data, null]) )
//         .catch( (error: any) => ([null, error]) )
// }

// export default postsRouterv1;
