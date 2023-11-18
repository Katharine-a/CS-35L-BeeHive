/*Firstly need to install express via npm install express
then install nodemon with npm install -g nodemon
this is so that when you do nodemon index.js, then everytime you change something inside this file it will restart the app, the express app
if i do node intex.js then refreshing the page will not show my updated progess
also do npm install cors
*/

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const User = require('./models/User');
const bcrypt = require('bcryptjs'); //for hashing/encrypting passwords
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 
const { response } = require('express');

const salt = bcrypt.genSaltSync(10); //for hashing/encrypting passowrds
const secret = 'anphhgrue795927ncuepq57839badjjiown'; //for webtokens

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
//if youre using credentials you need to specify more info in cors
app.use(express.json());
//add cookie parser npm install cookie-parser
app.use(cookieParser());

//need to connect to mongo database
mongoose.connect('mongodb+srv://beehive-blog:zcrbMRKyWz6fPzuq@cluster0.7dazpkm.mongodb.net/?retryWrites=true&w=majority');


app.post('/register', async (request,response) => { 
    const {username, password} = request.body;
    try{
        const userDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password,salt),
        });
        response.json(userDoc);
    }
        catch(e) {
            console.log(e);
            response.status(400).json(e);
        }
});

app.post('/login', async (request,response) => {
    const {username,password} = request.body;
    //grab the user
    const userDoc = await User.findOne({username}); //same as username:username
    const passOk = bcrypt.compareSync(password, userDoc.password);
    // response.json(passOk);
    if (passOk) {
        //user is logged in
        //this is where I install jsonwebtoken
        //send a token
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            response.cookie('token', token).json('ok');
        });
    }
    else {
        //not logged in
        response.status(400).json('wrong credentials');
    }
}); 

//check if logged in by token inside cookies, and check if the token is valid
app.get('/profile', (request,response) => {
    const {token} = request.cookies; //grab the token
    jwt.verify(token, secret, {}, (err,info) => {
        if (err) throw err;
        response.json(info);
    });
    // response.json(request.cookies);
});

app.post('/logout', (request,response) => {
    response.cookie('token', '').json('ok');
})

app.listen(4000); //on port 4000
//npm install mongodb in api
//mongodb+srv://beehive-blog:zcrbMRKyWz6fPzuq@cluster0.7dazpkm.mongodb.net/?retryWrites=true&w=majority
//beehive-blog pass: zcrbMRKyWz6fPzuq

