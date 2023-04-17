const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// List of Users
const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

// GET Users function, name or job, name & job (3 cases total)
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    // console.log(name);
    if (name != undefined & job != undefined){
        // Not sure how to implement job
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter((user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
    return users['users_list'].filter((user) => user['job'] === job); 
}

// create find user name and job

// GET id function
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        //http status code
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    // Assuming unique id, find > filter
    return users['users_list'].find( (user) => user['id'] === id);
    //return users['users_list'].filter( (user) => user['id'] === id);
}

// POST users function (adds users)
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}

// DELETE users function
app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    console.log(id);
    users['users_list'] = users['users_list'].filter( (user) => user['id'] !== id);
    res.status(204).end();
    // if user not in table, return 404 msg 
});
