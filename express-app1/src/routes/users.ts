import express from 'express';

let usersRouter = express.Router();

let data = {
    users:[
        {name:'name1', email:'email1@email.com', address: {city: 'city1'}, phone:'555-555-555', company:{name: 'company1'}},
        {name:'name2', email:'email2@email.com', address: {city: 'city1'}, phone:'555-555-555', company:{name: 'company2'}},
        {name:'name3', email:'email3@email.com', address: {city: 'city1'}, phone:'555-555-555', company:{name: 'company3'}}
    ]
};


usersRouter.get('/', (req, res) => {
    res.send(data.users);
});

export default usersRouter;
