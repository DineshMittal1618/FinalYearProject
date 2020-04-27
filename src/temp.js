// const express=require('express');
// const path =require('path');
// const hbs=require('ejs');
// const fs=require('fs');
// const session=require('express-session');
// var bodyParser = require('body-parser');
// const formidable=require('formidable');
// const socketio = require('socket.io');
// const http = require('http');
// require('./db/mongoose.js');

// const port = process.env.PORT || 3000;

// const app = express();

// const server = http.createServer(app)
// const io = socketio(server)
// const publicDirectoryPath = path.join(__dirname, '../public')
// const viewsPath=path.join(__dirname,"../templates/views");


// app.set('view engine','ejs');
// app.set('views',viewsPath);

// app.use(express.json());
// app.use(express.static(publicDirectoryPath))
// app.use(session({secret:"dineshmittal",resave:false,saveUninitialized:true}));
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true })); 




// app.get('',(req,res)=>{
//     res.render('index');
    
// })


// server.listen(port, () => {
//     console.log('Server is up on port ' + port)
// })