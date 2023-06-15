require('dotenv').config();
const cors = require('cors');
const cookiepaser = require('cookie-parser');
const nodeMailer = require('nodemailer');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Learners = require('../models/Learner/learner');
const Tutors = require('../models/Tutors/tutor');
const Bookings = require('../models/Bookings/Bookings');
const Announcement = require('../models/Announcement/announcement');
const Admin = require('../models/Admin/Admin');

//Database Connection............


const Admin_Auth = (req, res)=> {
    let {Email, Password} = req.body;

    try {
        if (!Email) {
            res.json({ message: "We could not find the email, don't worry we working on it!", code: 845 })
        } else {

            Admin.findOne({Email})
            .then(user =>{
                if(user){

                    bcrypt.compare(Password, user.Password, (err, results)=>{
                        if(err){
                            console.log(err)
                        }
                        if(results){

                            const token = jwt.sign({user}, process.env.JWT_KEY, {expiresIn: '2h'});

                            res.cookie('jwt', token, {
                                httpOnly: true,
                                maxAge: '120'
                            })

                            res.json({ 
                                id: user._id, 
                                code : 40,
                                token
                            })
                        }
                        else{
                            res.json({message: "Invalid Password!", type: "danger"});
                            //console.log("Password do not match!")
                        }
                    })

                }else{
                    res.json({message: "No user found!", type: "danger"});
                    //console.log("No user found!")
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const Admin_Home = (req, res) => {
    const {id, token} = req.params;

    try {

        if (!token || !id) {
            //res.json({message:"Auth Error! token not available"});
            res.redirect('/admin')
        } else {
            jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
                if (err) {
                    //res.json({message:('Not authorized')});
                    return res.redirect('/admin');
                }
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: '120'

                })
                Admin.findById({ _id: id })
                .then(user => {
                    res.render('admin', { admin: user, token });
                })
                .catch(err => console.log(err))
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}
const Admin_Logout = (req, res) => {

    const token = req.body.token;

    try{

        if(!token){
            console.log("token not found!")
            res.render('/admin');
        }else{
            jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
                if(err){
                    console.log(err)
                    res.render('/admin');
                }else{
                    decode.exp = '1';
                    decode.iat = '1';
                    res.json({code: 111});
                }
            })
        }

    }catch(err){
        console.log(err)
    }
}

const Read_Learners = (req, res) =>{
   
    try {

        Learners.find()
        .then(data => {
            res.json({ data })
        })
        .catch(err => {
            console.log(err)
        })

    } catch (error) {
        console.log(error)
    }
}
const Read_Tutors = (req, res) =>{
   
    try {

        Tutors.find()
        .then(data => {
            res.json({ data })
        })
        .catch(err => {
            console.log(err)
        })

    } catch (error) {
        console.log(error)
    }
}
const Read_Accepted_Learners = (req, res) => {

    try {

        Bookings.find({ Status: {$in: [ "Successful" ] } })
        .then(data => {
            res.json({ data })
        })
        .catch(error => {
            console.log(error)
        })
        
    } catch (error) {
        console.log(error)
    }

}
const Read_Learners_Bookings = (req, res) => {

    try {

        Bookings.find()
        .then(data => {
            res.json({ data })
        })
        .catch(error => {
            console.log(error)
        })
        
    } catch (error) {
        console.log(error)
    }

}

const Delete_Learner = (req, res) => {
    const id =req.body.id;
    try {

        if (!id) {
            res.json({ message: "We could not delete the learner, we looking into this matter!", code: 411 });

        } else {

            Learners.findByIdAndDelete({ _id: id })
            .then(()=> {
                Bookings.deleteMany({ Learner_Id: { $in: [id] } })
                .then(() => {
                    res.json({ message: "Successfully Deleted the learner and everything associated with!", code: 125 })
                })
                .catch(err => {
                    console.log(err)
                    res.json({ message: "We could not delete the learner, We looking into this matter!", code: 711 })
                })
            })
            .catch(err => {
                console.log(err)
                res.json({ message: "We could not delete the learner, We looking into this matter!", code: 311 })
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const Delete_Tutor = (req, res) => {
    const id =req.body.id;
    try {

        if (!id) {
            res.json({ message: "We could not delete the Learner, we looking into this matter!", code: 411 });

        } else {

            Tutors.findByIdAndDelete({ _id: id })
            .then(()=> {
                Bookings.deleteMany({ Tutor_Id: {$in: [ id ]} })
                .then(() => {

                    Announcement.deleteMany({ Tutor_id: { $in: [ id ] } })
                    .then(() => {
                        res.json({ message: "Successfully Deleted the Tutor and everything associated with!", code: 125 })
                    })
                    .catch(err => {
                        console.log(err)
                        res.json({ message: "Something went wrong!", code: 151 })
                    })

                })
                .catch(err => {
                    console.log(err)
                    res.json({ message: "We could not delete the Tutor, We looking into this matter!", code: 711 })
                })

            })
            .catch(err => {
                console.log(err)
                res.json({ message: "We could not delete the Learner, We looking into this matter!", code: 311 })
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    Read_Learners,
    Read_Tutors,
    Read_Accepted_Learners,
    Read_Learners_Bookings,
    Delete_Learner,
    Delete_Tutor,
    Admin_Auth,
    Admin_Home,
    Admin_Logout
}