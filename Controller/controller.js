require('dotenv').config();
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Learners = require('../models/Learner/learner');
// const cookie = require('cookie-session');
const cookiepaser = require('cookie-parser')
const multer = require('multer');
const Tutors = require('../models/Tutors/tutor');
const Bookings = require('../models/Bookings/Bookings');
const randomString = require('randomstring');
const nodeMailer = require('nodemailer')


const Thutopele_tutors = (req, res) => {

    Tutors.find()
    .then(all_tutors => {
        res.json(all_tutors)
    })
    .catch(err => {
        console.log(err)
    })
}

//FORGOT PASSWORD

const SendResetPasswordMail = async (name, surname, email, token) => {

    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SECRET_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const mail_options = {

        from: process.env.SECRET_EMAIL,
        to: email,
        subject: "Confirmation For Reseting Password.",
        html: `
            <h1>THUTO_PELE-TUTORS Reset password:</h1>
            <p>Allow us to send our greatest greeting to you, ${name} ${surname}.</p>
            <br>
            <p>Please click the link to <a href="http://localhost:5000/api/auth/password/reset?token=${token}">Reset</a>   your password.</p>
            <br>
            <h6>Kind Regards,</h6>
            <br>
            <h6>THUTO_PELE-TUTORS.</h6>
            
        `
    }

    transporter.sendMail(mail_options, (error, info) => {

        if (error) {
            console.log(error.message)
            console.log(error)
        }
        else{
            console.log("Email has been successfully sent.")
            res.send(info)
        }
    })
}
const SendBookingMain = async (t,l, email, tkn) => {

    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SECRET_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const mail_options = {

        from: process.env.SECRET_EMAIL,
        to: email,
        subject: "Booking Mail.",
        html: `
            <h1>THUTO_PELE-TUTORS Booking Mail:</h1>
            <p>Dear, ${t.Name}.</p>
            <br>
            <p>You have been requested for your tutorial lessons by the Learner below:</p>
            <br>
            <p>Name: ${l.Name} ${l.Surname}</p>
            <p>Email: ${l.Email}</p>
            <br>
            <p> you can <a href="http://localhost:5000/tutor/login">Login</a> now for more details.</p>
            <br>
            <h6>Kind Regards,</h6>
            <br>
            <h6>THUTO_PELE-TUTORS.</h6>
            
        `
    }

    transporter.sendMail(mail_options, (error, info) => {

        if (error) {
            res.json({ 
                message: "Something went wrong!", 
                code: 41,
            });
        }
    })
}

const SendContactEmail = async (name, email, subject, msg) => {

    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SECRET_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const mail_options = {

        from: email,
        to: process.env.SECRET_EMAIL,
        subject: "Contact Message Request.",
        html: `
            <h1>THUTO_PELE-TUTORS Contact:</h1>
            <p>Greeting to you!,.</p>
            <br>
            <p>There is a new contact request from the below client:</p>
            <br>
            <p><strong>Subject Line: </strong>${subject}</p>
            <p><strong>Full Name: </strong>${name}</p>
            <p><strong>Email Address: </strong>${email}</p>
            <p><strong>Message: </strong>${msg}</p>
            <br>
            <h6>Kind Regards,</h6>
            <br>
            <h6>THUTO_PELE-TUTORS.</h6>
            
        `
    }

    transporter.sendMail(mail_options, (error, info) => {

        if (error) {
            return false;
        }
    })
}

const Forgot_password = async (req, res) =>{
    const email = req.body.email;

    try {
        
        const learnerData = await Learners.findOne({Email: email});
        if (!learnerData) {
            
            const tutorData = await Tutors.findOne({Email: email})

            if (!tutorData) {

                res.json({message: "No User found!", type: 'danger'})
                //res.render('forgot-password')
            } else {
                
                if (tutorData.is_Verified !== undefined) {
                    res.json({message: "Please verify your email!", type: 'info'})
                } else {
                    
                    const randomToken = randomString.generate()

                    const updated = await Tutors.updateOne({Email: email}, {$set: {Token: randomToken}})
                    
                    SendResetPasswordMail(tutorData.Name, tutorData.Surname, tutorData.Email, randomToken);
                    res.json({message: "Email sent, Please check you email!", type: 'success'})
                }
            }

        } else {
            
            if (learnerData.is_Verified === 0) {
                res.json({message: "Please verify your email!", type: 'info'})
                //res.render('forgot-password')
            } else {
                const randomToken = randomString.generate()
                const updated = await Learners.updateOne({Email: email}, {$set: {Token: randomToken}})
                //SendResetPasswordMail(learnerData.Name, "tutor.locator167@gmail.com", randomToken);
                res.json({message: "Email sent, Please check you email!", type: 'success'})
                //res.render('forgot-password')
            }

        }

    } catch (error) {
        console.log(error.message)
    }
}
const Reset_Password = async (req, res ) => {
    
    try {
        
        const token = req.query.token;
        const learnerUser = await Learners.findOne({Token: token});

        if(!learnerUser){

            const tutorUser = await Tutors.findOne({Token: token})
            if (!tutorUser) {
                res.render('404', {mesaage: "Sorry an Error has occured, please try again later!"})
                
            } else {

              res.render('reset-pass', {
                id: tutorUser._id,
                code: 132
            }) 
            }
            
        }else{

            res.render('reset-pass', {
                id: learnerUser._id,
                code: 101
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const Change_Password = (req, res) =>{

    try {
        const {Password, id, cd} = req.body;
        
        bcrypt.hash(Password, 8, (err, encryptedPassword) =>{

            if(cd === 132){

                const tt = Tutors.findOneAndUpdate({_id: id}, {$set: {Password: encryptedPassword, Token: ''}})
                if(tt){

                    res.json({
                        message:'Successfullly Changed your password, ' + tt.Name, 
                        usernm: "tutor",  
                        type:'success',
                        
                    })

                }else{
                    res.redirect('/admin');
                }
            }
            else {

                const user = Learners.findOneAndUpdate({ _id: id }, { $set: { Password: encryptedPassword, Token: '' } })
                res.json({
                    message: 'Successfullly Changed your password, ' + user.Name,
                    usernm: "learner",
                    type: 'success',
                })

            }
            
           
        })

    } catch (error) {
        console.log(error.message)
    }
    
}

//Email VERIFICATION
const Verify_Email = async (req, res) =>{

    try {
        const id = req.query.id;
        const ld = await Learners.findByIdAndUpdate({_id: id}, {$set:{is_Verified: 1}})

        if(!ld){

            const ttt = await Tutors.findByIdAndUpdate({_id: id}, {$set:{is_Verified: 1}})

            if(ttt){
                res.render('verify-complete', {
                    message: "Your mail has successfully been verified!",
                    type: "success",
                    name: ttt.Name,
                    code: 112
                })

            }else{
                res.render('verify-complete', {
                    message: "Oops!!! User not found.",
                    type: "danger",
                    name: ttt.Name
                })
            }

            
        }else{

            res.render('verify-complete', {
                message: "Your mail has successfully been verified!",
                type: "success",
                name: ld.Name,
                code: 106
            })
        }

        
    } catch (error) {
        console.log(error.message)
    }
}

const find_tutors = (req, res)=> {
    
        try {
    
            Tutors.find()
            .then(all_tutors => {
                res.render('available-tutors', {tutors: all_tutors,});
            })
            .catch(err => {
                console.log(err)
            })
            
        } catch (error) {
            console.log(error)
        }
}

const auth_available_tutors = (req, res) => {
    try {
        const id = req.params.id;
        const token = req.params.token;
        if(!token){
            console.log("Auth Error! token not available");
            res.redirect('/learner/login')
        }else{
            jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
                if(err){
                    return res.redirect('/learner/login');
                }
                else{
                    Tutors.find()
                    .then(all_tutors => {
                        res.render('find-tutor', {tutors:all_tutors, user:decode.user, token});
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}


const Request_Tutor = async (req, res) => {

    const data = req.body.data;
    
    const lid = data.id;
    const token = data.token;
    const tid = data.uid;

    if (!lid && !tid && !token) {
        res.redirect('/learner/login')
    } else {

        try{
            const stud = await Learners.findById({ _id: lid });
            const tut = await Tutors.findById({ _id: tid });
            if(!token){
                console.log("Auth Error! token not available");
                res.redirect('/learner/login')
            }else{
                jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
                    if(err){
                        return res.redirect('/learner/login');
                    }
                    else{
                        if(!tut){
                            console.log("tutor not found!");
                        }else{

                            Bookings.findOne({ Tutor_Id: tid, Learner_Id: lid })
                            .then(results => {

                                if (results.Module === tut.Subject_Name) {

                                    res.json({ 
                                        message: "You have already booked this tutor for this module!", 
                                        code: 265 })

                                } else {

                                    const Booking = new Bookings({
                                        Learner_Name: decode.user.Name,
                                        Learner_Surname: decode.user.Surname,
                                        Learner_Email: decode.user.Email,
                                        Learner_Phone: decode.user.Phone,
                                        Learner_Id: decode.user._id,
                                        Module: tut.Subject_Name,
                                        Tutor_Id: tut._id,
                                        Tutor_Name: tut.Name,
                                        Tutor_Surname: tut.Surname,
                                        Tutor_Email: tut.Email
                                    })
                                    Booking.save()
                                    .then(() => {
                                        SendBookingMain(tut, decode.user, "tutor.locator167@gmail.com", token);
                                        res.json({ 
                                            message: "Successfully requested a tutor, keep checking your status!", 
                                            code: 411,
                                            user: decode.user,
                                            token
                                        });
                                    })
                                    .catch(err =>{
                                        console.log(err);
                                    })
                                }
                            })
                            
                        }
                    }
                })
            }
    
        }
        catch(err){
            console.log(err);
        }
    }
   
    

}

const Contact_Us = (req, res) =>{

    const {Name, Email, Subject, Message} = req.body;

    try {

        if(Email){
            SendContactEmail(Name, Email, Subject, Message);
            res.json({ message: "Email has been successfully sent, Thank You!.", code: 32 });
        }else{

            res.json({ message: "Something went wrong!", code: 032 })
        }


    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    Thutopele_tutors,
    Forgot_password,
    Reset_Password,
    Change_Password,
    Verify_Email,
    Request_Tutor,
    auth_available_tutors,
    find_tutors,
    Contact_Us
}