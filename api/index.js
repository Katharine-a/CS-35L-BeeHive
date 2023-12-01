/*Firstly need to install express via npm install express
then install nodemon with npm install -g nodemon
this is so that when you do nodemon index.js, then everytime you change something inside this file it will restart the app, the express app
if i do node intex.js then refreshing the page will not show my updated progess
also do npm install cors
*/

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs'); //for hashing/encrypting passwords
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

// const { response } = require('express');

const salt = bcrypt.genSaltSync(10); //for hashing/encrypting passowrds
const secret = 'anphhgrue795927ncuepq57839badjjiown'; //for webtokens

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
//if youre using credentials you need to specify more info in cors
app.use(express.json());
//add cookie parser npm install cookie-parser
app.use(cookieParser());

//need to connect to mongo database
mongoose.connect('mongodb+srv://beehive-blog:zcrbMRKyWz6fPzuq@cluster0.7dazpkm.mongodb.net/?retryWrites=true&w=majority');
//Katharine's
//mongoose.connect('mongodb+srv://Katharine_Archer:pLAoAj08T4Dv1d4c@cluster0.7dazpkm.mongodb.net/?retryWrites=true&w=majority');

//send information with a post request
app.post('/register', async (request,response) => { 
    const {username, password} = request.body;
    try{
        const userDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password,salt),
        });
        response.json(userDoc);
    } catch(e) {
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
        //then user is logged in
        //this is where I install jsonwebtoken
        //send a token
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            response.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
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
});

app.post('/post',uploadMiddleware.single('file'), async (request, response) => {
    const {originalname, path} = request.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {token} = request.cookies; //grab the token
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
        const {title, summary, content} = request.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id,
        });
        response.json(postDoc);
    });
   
});

app.get('/post', async (request, response) => {
    response.json(
        await Post.find()
        .populate('author', ['username'])
        );
});

app.listen(4000); //on port 4000
//npm install mongodb in api
//mongodb+srv://beehive-blog:zcrbMRKyWz6fPzuq@cluster0.7dazpkm.mongodb.net/?retryWrites=true&w=majority
//beehive-blog pass: zcrbMRKyWz6fPzuq



//Katharine Archer User
//mongodb+srv://Katharine_Archer:pLAoAj08T4Dv1d4c@cluster0.7dazpkm.mongodb.net/?retryWrites=true&w=majority
//pass: pLAoAj08T4Dv1d4c