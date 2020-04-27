const express = require('express')
const User = require('../models/user')
const formidable=require('formidable');
const auth = require('../../middleware/auth')
const path=require('path')
const fs=require('fs')
const print=require('../../src/utils/print');
const router = new express.Router()

router.get('',(req,res)=>{
    res.render('index');
})

router.post('/users/login', async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findByCredentials(req.body.email, req.body.password);
        console.log(user);
        
        const token = await user.generateAuthToken();
        console.log(token);
        
        res.status(201).cookie('Authorization', 'Bearer ' + token).redirect(301, '/dashboard');
    } catch (e) {
        res.status(400).send()
    }
})


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    console.log(req.body);
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).cookie('Authorization', 'Bearer ' + token).redirect(301, '/dashboard')
        //res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})




router.get('/dashboard',async(req,res)=>{
    console.log('Cookies',req.cookies.Authorization);
    res.render('dashboard',{Title:'Dashboard',name:'CC-Group12'});
})



router.get('/users/me', auth, async (req, res) => {
    
    res.send(req.user)
})





router.get('/upload',(req,res)=>{
    
    res.render('upload',{Title:'Upload',name:'CC-Group12'})
})


router.post('/upload',auth,(req,res)=>{
    console.log(req.user);
    
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

      var oldpath = files.filetoupload.path;
      newdirpath=path.join(__dirname,'../../Public/uploads/'+req.user.name);
      if(!fs.existsSync(newdirpath))
      {
          fs.mkdirSync(newdirpath);
      }
      var newpath=path.join(__dirname,'../../Public/uploads/'+req.user.name+'/'+ files.filetoupload.name);
      fs.readFile(oldpath, function (err, data) {
        if (err) throw err;
        console.log('File read!');

        // Write the file
        fs.writeFile(newpath, data, function (err) {
            if (err) throw err;
            res.redirect('/dashboard');
            res.end();
            console.log('File written!');
        });

        // Delete the file
        fs.unlink(oldpath, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    });
})})



router.get('/view',auth,(req,res)=>{
    
    const dirPath=path.join(__dirname,'../../Public/uploads/'+req.user.name);
    console.log(dirPath);
    
    fs.readdir(dirPath,(err,ls)=>{
        console.log(ls);
        
        res.render('view',{Title:'View',name:'CC-Group12',data:ls})    
    })
})

router.get('/display',auth,(req,res)=>{
    const data=req.query.data;
    const filepath=path.join(__dirname,"../../Public/uploads/"+req.user.name+'/'+data);
    console.log(filepath);
    res.sendFile(filepath);
})



router.get('/delete',auth,(req,res)=>{

    const dirPath=path.join(__dirname,'../../Public/uploads/'+req.user.name);
    fs.readdir(dirPath,(err,ls)=>{
        res.render('delete',{Title:'Delete',name:'CC-Group12',data:ls})    
    })
})

router.get('/deleteSelected',auth,(req,res)=>{
    const data=req.query.data;
    const filepath=path.join(__dirname,"../../Public/uploads/"+req.user.name+'/'+data);

    fs.unlink(filepath,(err)=>{
        if(err)
        return console.log('err');
        
        res.redirect('/dashboard');
        
    });

})

router.get('/print',auth,(req,res)=>{
    res.render('print',{Title:'Print',name:'CC-Group12'})
})

router.post('/printSelected',auth,(req,res)=>{
    print(req.user.name);
})


router.get('/show',(req,res)=>{
    const data=req.query.name;
    console.log(data);
    
    const filepath=path.join(__dirname,"../../Public/uploads"+'/'+data+'/Table.pdf');
    res.sendFile(filepath);
})


router.get('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.clearCookie('Authorization').redirect("/");
    } catch (e) {
        res.status(500).send()
    }
})

module.exports=router