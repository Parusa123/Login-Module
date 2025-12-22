const express=require('express');
const logrout=require("./router/logrout");
const server=express();
//for the database
const mongoose=require('mongoose')

//for managing students apis


mongoose.connect('mongodb://127.0.0.1:27017/LoginBhai' )
  .then(() => console.log('Connected successfully'))
  .catch(err => console.error('Connection error', err));

server.use(express.json())


const cors = require('cors');
server.use(cors({ origin: 'http://127.0.0.1:5500'}));



const port=process.env.PORT || 3000;
server.listen(port,()=>console.log(`Listening on port ${port}...`));