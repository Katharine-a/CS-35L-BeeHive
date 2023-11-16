/*Firstly need to install express via npm install express
then install nodemon with npm install -g nodemon
this is so that when you do nodemon index.js, then everytime you change something inside this file it will restart the app, the express app
if i do node intex.js then refreshing the page will not show my updated progess
also do npm install cors
*/

const express = require('express');
const cors = require('cors');
const app= express();

app.use(cors());
app.use(express.json());

app.post('/register', (request,response) => { 
    const {username, password} = request.body;
    response.json({requestData:{username,password}});
});

app.listen(4000); //on port 4000

