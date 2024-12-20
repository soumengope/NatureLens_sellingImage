const express = require('express');
const connection = require('./connect');
const Datas = require('./datas_schema');
const user_models = require("./users_scheme.js");
const cors = require('cors');
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials:true,
}));
connection.set();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());

app.use(session({
    key: 'userID',
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.URI,
        ttl: 30 * 24 * 60 * 60,
        autoRemove: 'native',
    }),
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'lax',
    }
}));

const razorpay = new Razorpay({
    key_id : process.env.ROZORKEYID,
    key_secret : process.env.ROZORKEYSECRET
})
app.post('/makeOrder',async (req,res)=>{
    const receiptId = `receipt_${uuidv4().slice(0, 6)}`; 
    const options = {
        amount: req.body.amount * 100,
        currency: 'INR',
        receipt: receiptId,
    }
    try{
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.json({ err: err.message });
    }
})

app.get('/getDatas', (req, res) => {
    Datas.find().then(items => {
        res.json(items);
    }).catch(err => {
        res.json({ message: 'Error fetching items' });
    });
});

app.post('/signin',async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try{
        const getData = await user_models.find({email:email});
        if(getData){
            if(password != ''){
                if(getData[0].password === password){
                    req.session.user = getData;
                    res.send({message:'Successfully Logged In', status:200})
                }
            }else{
                res.send({message:'Invalid credentials', status:400})
            }
        }
        
    }catch(err){
        console.log(err);
        res.send({message:'Invalid Credentials', status:400})

    }
})
app.get('/signin',(req,res)=>{
    if(req.session.user){
        res.send({loggedIn:true,user:req.session.user})
    }else{
        res.send({loggedIn:false,user:req.session.user})
    }
})
app.post('/signout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('userID');
        res.status(200).json({ message: 'Logged out successfully' });
    });
  });

app.post('/signup',(req,res)=>{
    const { inpValues } = req.body;
    if(inpValues.data.fullname !=='' && inpValues.data.email !== '' 
        && inpValues.data.password !=='' && inpValues.data.cpassword!==''){
        if(inpValues.data.fullname.length > 5){
            function validateEmail(email) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(email);
            }
            if(validateEmail(inpValues.data.email)){
                if(inpValues.data.password.length >=8){
                    if(inpValues.data.password === inpValues.data.cpassword){
                        const data = async()=>{
                            const result = await user_models.create({ fullname:inpValues.data.fullname,
                                 email:inpValues.data.email, password:inpValues.data.password, score:0});
                            res.send({message:'successfully stored', status:200});
                        }
                        data()
                        
                    }else{
                        res.send({message:'password and confirm password does not match', status:400})
                    }
                }else{
                    res.send({message:'password must be atleast 8 character', status:400})
                }
            }else{
                res.send({message:'Email is not valid',status:400})
            }
        }else{
            res.send({message:'Fullname is too short',status:400})
        }
        
    }else{
        res.send({message:'Input is empty','status':400})
    }
})
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is ruuning at ${port}`);
})