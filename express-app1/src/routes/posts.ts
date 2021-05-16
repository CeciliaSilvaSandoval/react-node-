import express from 'express';

let postsRouterv1 = express.Router();

let data = {
    posts:[
        {id: 1,userId:1, title: 'sunt aut facere', body:'quia et suscipit...'},
        {id: 2,userId:1, title: 'qui est esse', body:'qui et esse...'},
        {id: 3,userId:1, title: 'ea molestias facere', body:'quia et suscipit...'}
    ]
};

postsRouterv1.get('/', (req, res) => {
    res.send(data.posts);
});
postsRouterv1.post('/', (req, res) => {
    res.send('creating in v1...');
});
postsRouterv1.patch('/', (req, res) => {
    res.send('patching...');
});
postsRouterv1.delete('/', (req, res) => {
    res.send('deleting...');
});

export default postsRouterv1;
