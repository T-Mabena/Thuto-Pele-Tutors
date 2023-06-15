const express = require("express");
const Router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');

//Database MongoDB Connection--------

mongoose.connect(process.env.DB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', ()=> console.log('Connected to the database!'))

//CONNECTION END=============

const { Thutopele_tutors, Forgot_password, Reset_Password, Change_Password, Verify_Email, Request_Tutor, auth_available_tutors, find_tutors, Contact_Us, } = require('../Controller/controller');


const { Tutor_application, Tutor_login, Tutor_Logout, Tutor_home, Tutor_Update, Tutor_FilalUpdate, Tutor_Profile, Read_Bookings, Update_Status, New_Announcement, Read_Announcement, Delete_Announcement } = require("../Controller/Tutor_Controller");

const { Learner_home, LearnerRegistration, LearnerLogin, Learner_Logout, Learner_Bookings, Get_Announcement, } = require("../Controller/Learner_Controller");
const { Read_Learners, Read_Tutors, Read_Accepted_Learners, Read_Learners_Bookings, Delete_Learner, Delete_Tutor, Admin_Auth, Admin_Home, Admin_Logout} = require("../Controller/Admin_Controller");

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/Tutors');
    },

    filename: function(req, file, cb){
        cb(null, 'profile_photo' +'_'+ Date.now() +'_'+ file.originalname);
    },

});

let upload = multer({
    storage: storage
}).single("Profile")



// ADMIN SECTION


Router.get('/admin', (req, res)=>{
    res.render('admin-login')
})
Router.get('/admin/home/:id/:token', Admin_Home)
Router.post('/api/admin/login', Admin_Auth)
Router.post('/api/admin/logout', Admin_Logout)
Router.get('/api/admin/read/learners', Read_Learners)
Router.get('/api/admin/read/tutors', Read_Tutors)
Router.get('/api/admin/read/accepted/learners', Read_Accepted_Learners)
Router.get('/api/admin/read/learner/bookings', Read_Learners_Bookings)
Router.post('/api/admin/delete/learner', Delete_Learner)
Router.post('/api/admin/delete/tutor', Delete_Tutor)

//ADMIN END

Router.get('/', (req, res) =>{
    res.render('index')
})

Router.get('/contact', (req, res)=>{
    res.render('contact')
})
Router.post('/contact/details', Contact_Us)

Router.get('/about', (req, res)=>{
    res.render('about')
})
Router.get('/portfolio', (req, res)=>{
    res.render('portfolio')
})

Router.get('/api/auth/forgot-password', (req, res)=>{
    res.render('forgot-password')
})

Router.get('/thutopele/available/tutors', Thutopele_tutors)
Router.post('/api/auth/forgot-password', Forgot_password)
Router.get('/api/auth/password/reset', Reset_Password)
Router.post('/api/auth/password/change', Change_Password)
Router.get('/api/auth/verify', Verify_Email)
// POST


//LEAERNER ROUTES
Router.get('/find/tutor', find_tutors)

Router.get('/learner/find/tutor/:id/:token/find-tutor', auth_available_tutors)

Router.get('/learner/login', (req, res)=>{
    res.render('learner-login')
})
Router.get('/learner/signup', (req, res)=>{
    res.render('learner-registration')
})
Router.get('/blog/details', (req, res)=>{
    res.render('blog-details')
})

Router.get('/learner/home/:id/:token', Learner_home)

Router.post('/api/auth/learner/register', LearnerRegistration);
Router.post('/api/auth/learner/login', LearnerLogin);
Router.get('/learner/api/auth/logout', Learner_Logout);
Router.post('/api/learner/bookings', Learner_Bookings)
Router.post('/api/learner/get/announcementt', Get_Announcement)

Router.get('/learner/api/auth/learner/logout', Learner_Logout);
Router.get('/tutor/profile/:id/learner', Tutor_Profile)

//TUTOR ROUTES

Router.get('/become/tutor', (req, res)=>{
    res.render('become-tutor')
})
Router.get('/tutor/application', (req, res)=>{
    res.render('tutor-application')
})
Router.get('/tutor/login', (req, res)=>{
    res.render('tutor-login')
})
Router.get('/tutor/home/:id/:token', Tutor_home)

Router.post('/api/auth/tutor/application', upload, Tutor_application);
Router.post('/api/auth/tutor/login', Tutor_login)
Router.post('/api/auth/tutor/logout', Tutor_Logout)
Router.get('/tutor/update/:id/:token', Tutor_Update)
Router.post('/tutor/update/:id/:token',upload, Tutor_FilalUpdate)
Router.post('/api/tutor/bookings',  Read_Bookings);
Router.post('/api/tutor/update/status', Update_Status)
Router.post('/api/tutor/new/announcement', New_Announcement)
Router.post('/api/get/tutor/announcement', Read_Announcement)
Router.post('/api/delete/announcement', Delete_Announcement)


Router.post('/api/tutor/request', Request_Tutor)


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
module.exports = Router