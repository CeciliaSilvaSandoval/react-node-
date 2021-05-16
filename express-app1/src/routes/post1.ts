import express from 'express';

let postsRouterv2 = express.Router();

let data = {
    posts:[
        {id: 1,userId:1, title: 'sunt aut facere', body:'quia et suscipit...'},
        {id: 2,userId:1, title: 'qui est esse', body:'qui et esse...'},
        {id: 3,userId:1, title: 'ea molestias facere', body:'quia et suscipit...'}
    ]
};

postsRouterv2.get('/', (req, res) => {
    res.send(data.posts);
});
postsRouterv2.post('/', (req, res) => {
    res.send('creating in v2...');
});
postsRouterv2.patch('/', (req, res) => {
    res.send('patching...');
});
postsRouterv2.delete('/', (req, res) => {
    res.send('deleting...');
});

export default postsRouterv2;
