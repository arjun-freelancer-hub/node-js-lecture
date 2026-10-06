import express from 'express';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import User from './userModel.js';


const app = express();

app.use(bodyParser.json());
const userData = [{
    name: 'Sarthak',
    age: 25,
    city: 'New York',
    country: 'USA'
},
{
    name: 'John',
    age: 30,
    city: 'Los Angeles'
}
]

async function connectToDatabase() {
    await mongoose.connect('mongodb+srv://arjunfreelancerhub_db_user:wVRE1LdgzVpVJOXx@cluster0.91e6evz.mongodb.net/node-demo?appName=Cluster0')

    console.log('Connected to MongoDB')

}

connectToDatabase();

app.get('/sarthak', async(req, res) => {

    const allUsers = await User.find();
    res.status(200).json({
        message: 'All users fetched successfully',
        users: allUsers
    });
})


app.post('/user', async(req, res)=> {
    console.log(req.body);

    const userTocreate = {name : req.body.name, age: req.body.age, city: req.body.city, country: req.body.country, hair: {color: req.body.hair.color, hairType: req.body.hair.type}};

    const user = await User.create(userTocreate);
    res.status(200).json({
        message: 'User created successfully',
        user: user
    })
})
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});