require('dotenv').config();
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Learners = require('../models/Learner/learner');
const Bookings = require('../models/Bookings/Bookings');
const Announcement = require('../models/Announcement/announcement');
const cookiepaser = require('cookie-parser')
const multer = require('multer');
const randomString = require('randomstring');
const nodeMailer = require('nodemailer')


const LearnerRegistration = (req, res)=>{
    
    let info = req.body[0];

    //Password Encryption
    bcrypt.hash(info.Password, 8, (err, encryptedPassword) =>{
        if(err){
            res.json({error:err})
            return
        }

        Learners.findOne({
            Email: info.Email
        }).then(user =>{
            if(user){
                res.json({message: "Failed! Email is already in use!"})
                return;
            }
            else{
                const Learner = new Learners({
                    Name: info.Name,
                    Surname: info.Surname,
                    Phone: info.Phone,
                    Email: info.Email,
                    Subjects: info.Subjects,
                    Address: info.Address,
                    Password: encryptedPassword
                })
            
                Learner.save()
                .then(()=>{
                   res.json({
                        message: "Successfully Created Account! Please check and verify email before login!",
                        code: 200
                    })
                })
                .catch((err)=>{
                    res.json({
                        message: err.message
                    })
                })
            }
        })
        .catch(error => console.log(error))

    })


}

const LearnerLogin = (req, res) =>{

    let data = req.body[0]
    try {
        
        Learners.findOne({Email: data.Email})
        .then(user =>{
            if(user){
                if(user.is_Verified === 0){
                    bcrypt.compare(data.Password, user.Password, (err, results)=>{
                        if(err){
                            console.log("Passwprd bcrypt:", err)
                        }
                        if(results){
                            const token = jwt.sign({user}, process.env.JWT_KEY, {expiresIn: '1h'});
                            res.cookie("jwt", token, {
                                httpOnly: true,
                                maxAge: '120'

                            });

                            res.json({ 
                                id: user._id,
                                code : 40,
                                token
                            });
                        }
                        else{
                            return res.json({message: "Invalid Password!", code: 404});
                            //console.log("Password do not match!")
                        }
                    })

                }else{
                    res.json({message: "Please make sure you have verified your email, before login!", code: 404});
                }
                
            }else{
                res.json({message: "No user found!", type: "danger"});
                //console.log("No user found!")
            }

        })

    } catch (error) {
        console.log(error)
    }
}

const Learner_Logout = (req, res) =>{
    const token = req.query.token;

    if(!token){
        res.redirect('/learner/login');
    }else{
        try{
            
            jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
                if(err){
                    console.log(err)
                    res.redirect('/learner/login');
                }else{
                    decode.exp = '1';
                    decode.iat = '1';

                    res.redirect('/learner/login');
                }
            })
        } catch(error){
            console.log(error)
        }
    }
}

const  Learner_home = (req, res) => {
   
    const token = req.params.token;
    const uid = req.params.id;

    if(!token){
        //res.json({message:"Auth Error! token not available"});
        //console.log("Auth Error! token not available");
        res.redirect('/learner/login')
    }else{
        jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
            if(err){
                //res.json({message:('Not authorized')});
                //console.log('Not authorized');
                return res.redirect('/learner/login');
            }
            res.render('learner-home', { user:decode.user, token });
        })
    }

}

const Learner_Bookings = (req, res) => {
    const id = req.body.uid;

    try {

       Bookings.find( { Learner_Id: { $in: [ id ] } } )
       .then(book => {
            res.json({ book })
       })
       .catch(err => {
            console.log(err)
       })

    } catch (error) {
        console.log(error)
    }

}

const Get_Announcement = (req, res) => {
    const id = req.body.uid;
    try {
        if (!id) {
            res.json({ message: "Ouch! Something went wrong!" })
        } else {
            Bookings.find({ Learner_Id: { $in: [ id ] } })
            .then(bok => {
                bok.forEach(i => {
                    if (i.Status === "Successful") {

                        Announcement.find( { Module: { $in: [ i.Module ] } } )
                        .then(data => {
                                res.json({ data })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }
                });
            })
        }
    } catch (error) {
        console.log(error)
    }
}






module.exports = {
    LearnerRegistration,
    LearnerLogin,
    Learner_Logout,
    Learner_home,
    Learner_Bookings,
    Get_Announcement
}