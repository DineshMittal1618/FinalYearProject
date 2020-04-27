const express = require('express')
const path =require('path');
const bodyParser=require('body-parser');
const userRouter = require('./routers/user');
const cookieParser=require('cookie-parser');

require('./db/mongoose');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath=path.join(__dirname,'../templates/views');

app.use(express.static(publicDirectoryPath))
app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());


app.set('view engine','ejs');
app.set('views',viewsPath);


app.use(userRouter)



module.exports = app