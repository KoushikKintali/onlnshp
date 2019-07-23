const express = require("express");
const session = require("express-session")
const bodyParser=require("body-parser")
const app = express();
app.use(express.static('public'));
app.set('view engine','ejs');
//app.set('views','./template');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'this is a secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 365*24*60*60000    // 1min

 }
}));

app.use('/',require('./routes/user'));
app.use('/products',require('./routes/product'));
const loadModels = require("./utils/loadmodels");
loadModels(app);
// app.listen(process.env.PORT || 1234 ,(err)=>{
//     if(err){
//         console.log("Error is ::::",err)
//         throw err;
//     }
//     else{
//         console.log('Server Started at 1234');
//     }
// })