/*Firstly need to install express via npm install express
*/

const express = require('express');
const cors= require('cors')
const app= express();

app.use(cors());
app.use(express.json());

app.post('/register', (request,response) => { 
    const {username, password} = request.body;
    response.json({requestData:{username,password}});
});

app.listen(4000);

