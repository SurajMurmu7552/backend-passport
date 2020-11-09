const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const connectDb = require('./config/db')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const { isAuth , isGuest} = require ('./middleware/auth')

dotenv.config()

require('./config/passport-config')

const app = express()

app.use(cors());

connectDb();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({ mongooseConnection : mongoose.connection})

}))

app.use(passport.initialize())
app.use(passport.session())

app.get("/", isGuest, (req , res)=>{
    res.send("home");    
});

app.get("/api/user", isAuth , (req ,res) =>{
    return res.json(req.user);
});

app.get('/facebook', passport.authenticate('facebook'))

app.get('/facebook/callback',passport.authenticate('facebook', { 
    successRedirect: '/dashboard',
    failureRedirect: '/' 
}))

app.get("/dashboard", isAuth , (req ,res) =>{
    res.redirect('http://localhost:3000/loggedin')
});

app.get('/api/logout',(req, res)=>{
    req.logout();
    res.redirect('http://localhost:3000/')
})

                                

PORT = process.env.PORT || 4000

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`)
})