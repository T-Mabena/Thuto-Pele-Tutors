require('dotenv').config();
const express = require("express")
const Router = require("./routes/routes"); 
const cookieParser = require('cookie-parser');
const cookies = require('cookie-session');
const app = express()

let PORT = 5000;

app.listen(PORT, ()=> {
    console.log(`The server has started on http://localhost: ${PORT}`)
});

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(Router)
app.use(cookieParser());

// app.use((req, res, next)=>{
//     res.locals.message = req.session.message,
//     delete req.session.message,
//     next()
// })
// app.use(sessions({
//     secret: process.env.SESSION_KEY,
//     saveUninitialized:true,
//     resave: false 
// }));
app.use(
    cookies({
        name: 'Thuto_Pele_Tutors',
        secret: process.env.SESSION_KEY,
        httpOnly : true
    })
)