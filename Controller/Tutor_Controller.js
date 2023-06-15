require('dotenv').config();
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookiepaser = require('cookie-parser')
const multer = require('multer');
const Tutors = require('../models/Tutors/tutor');
const Bookings = require('../models/Bookings/Bookings');
const Announcement = require('../models/Announcement/announcement');
const randomString = require('randomstring');
const nodeMailer = require('nodemailer');
const fs = require('fs');


const SendVerificationMail = async (name, surname, email, id) => {

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
        subject: "Confirmation For Email verification.",
        html: `
            <h1>THUTO_PELE-TUTORS Mail verification:</h1>
            <p>Allow us to send our greatest greeting to you, ${name} ${surname}.</p>
            <br>
            <p>Please click the link to <a href="http://localhost:5000/api/auth/verify?id=${id}">Verify</a>   your email.</p>
            <br>
            <h6>Kind Regards,</h6>
            <br>
            <h6>THUTO_PELE-TUTORS.</h6>
            
        `
    }

    transporter.sendMail(mail_options, (error, info) => {

        if (error) {
            console.log(error)
            return false;
        }
    })
}

const SendAnnouncementDetails = async (tn, ts, email, sub, msg) => {

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
        subject: "New Announcement.",
        html: `
            <h1>THUTO_PELE-TUTORS Announcement:</h1>
            <p>Dear Student.</p>
            <br>
            <p>There is a new and urgent announcement made that needs your attention:</p>
            <br>
            <p>Tutor Name: ${t.Tutor_Name} ${t.Tutor_Surname}</p>
            <p>Subject: ${sub}</p>
            <p>Message: ${msg}</p>
            <br>
            <p> you can <a href="http://localhost:5000/learner/login">Login</a> now for more details.</p>
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

const Tutor_application = (req, res) => {

    const {
        Name, Surname, DoB,
        Phone, AltPhone, About, 
        SubName, SubPrice, Opt,
        Address, City, Gender,
        Email, Password

    } = req.body;

    bcrypt.hash(Password, 8, (err, encryptedPassword) =>{
        if(err){
            res.json({error:err});
            return;
        }

        Tutors.findOne({
            Email
        }).then(user =>{
            if(user){
                res.json({message: "Failed! Email is already in use!"})
                return;
            }
            else{
                const Tutor = new Tutors({
                    Name: Name,
                    Surname: Surname,
                    Gender: Gender,
                    Date_Of_Birth: DoB,
                    Alt_Phone: AltPhone,
                    Phone: Phone,
                    About_Me: About,
                    Address: Address,
                    City: City,
                    Email: Email,
                    Subject_Name: SubName,
                    Subject_Price: SubPrice,
                    Subject_Method: Opt,
                    Profile_Photo: req.file.filename,
                    Password: encryptedPassword
                })
            
                Tutor.save()
                .then((tutor)=>{
                   res.json({
                        message: "Application Sent Successfully! Please check and verify mail before login!",
                        code: 200
                    })

                    SendVerificationMail(Name, Surname, Email, tutor._id)
                })
                .catch((err)=>{
                    res.json({
                        message: err.message,
                        code: 145
                    })
                })
            }
        })
        .catch(error => console.log(error))

    })


}

const Tutor_login = (req, res) => {

    let {Email, Password} = req.body[0];

    Tutors.findOne({Email})
    .then(user =>{
        if(user){

            bcrypt.compare(Password, user.Password, (err, results)=>{
                if(err){
                    console.log("Passwprd bcrypt:", err)
                }
                if(results){

                    if(user.is_Verified === 1){

                        if (user.Background_Checked === "Success") {

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
        
                        } else {
                            res.json({message: "You cannot Login yet since your application is " + user.Background_Checked +", try again in 24hrs!", type: "info"});
                        }
        
                    }else{
                        res.json({message: "Please check and verify your mail!", type: "info"});
                        SendVerificationMail(user.Name, user.Surname, user.Email, user._id)
                    }
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

const  Tutor_home = (req, res) => {
   
    const token = req.params.token;
    const uid = req.params.id;

    if(!token){
        //res.json({message:"Auth Error! token not available"});
        res.redirect('/tutor/login')
    }else{
        jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
            if(err){
                //res.json({message:('Not authorized')});
                return res.redirect('/tutor/login');
            }
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: '120'

            })
            Tutors.findById({_id:uid})
            .then(user =>{
                res.render('tutor-home', { id: uid, user, token });
            })
            .catch(err => console.log(err))
        })
    }

}

const Tutor_Logout = (req, res) =>{

    const token = req.body[0].tk;

    if(!token){
        res.render('/tutor/login');
    }else{
        jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
            if(err){
                console.log(err)
                res.render('/tutor/login');
            }else{
                decode.exp = '1';
                decode.iat = '1';
                res.json({code: 111});
            }
        })
    }
}

const Tutor_Update = (req, res) => {
    
    try {
        
        const {id, token} = req.params;

        jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
            if(err){
                //res.json({message:('Not authorized')});
                res.render('tutor-login', { message: "You session has expired! You need to login again." });
            }
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: '120'

            })
            Tutors.findById({_id:id})
            .then(user =>{
                res.render('TestingInput', {user: user, token});
            })
            .catch(err => console.log(err))
        })

        // Tutors.findById(id)
        // .then((user)=>{

        //     if (user) {
        //          res.render('TestingInput', {user, token})
        //     } else {
        //         console.log('No user found!')
        //         res.redirect('/tutor/home/'+id+'/'+token)
        //     }
        // })
        // .catch(err => console.log(err.message))

    } catch (error) {
        console.log(error.message)
    }
}

//ill be back
const Tutor_FilalUpdate = (req, res)=> {

    const { id, token } = req.params;
    const data = req.body
    let new_Image = "";

    if (data.profile === '' || data.profile == undefined) {
        new_Image = req.body.old_img;

    } else {

        new_Image = req.body.profile
        try {
            let picture = 'profile_photo' +'_'+ Date.now() +'_'+ new_Image;

            fs.unlinkSync("./public/Tutors/" + req.body.old_img)
            fs.linkSync("./public/Tutors/" + picture);

        } catch (error) {
            console.log(error.message)
        }
    }

    Tutors.findByIdAndUpdate({_id: id}, {$set: {
        Name: data.name,
        Surname: data.surname,
        Gender: data.gender,
        Email: data.email,
        Phone: data.phone,
        Alt_Phone: data.alt_phone,
        Address: data.address,
        City: data.location,
        Subject_Name: data.special,
        Subject_Price: data.price,
        Profile_Photo: new_Image
    }})
    .then(user => {
        res.redirect('/tutor/home/'+ id +'/'+ token)
        //console.log("User updated successfully!")
    })
    .catch(err => console.log(err))
    
}

const Tutor_Profile = (req, res)=>{
    try{
       const id = req.params.id;
       const token = req.query.tkn;

        Tutors.findById({_id:id})
        .then(Tutor =>{
            if(Tutor !== null){

                if (!token) {
                    res.render('tutor_profile', { user:Tutor ,  token: ""})
                } else {
                    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
                        if(err){
                            res.render('tutor_profile', { user:Tutor ,  token: ""})
                        }
                        else{
                            res.render('tutor_profile', { user:Tutor ,  token, decode})
                        }
                    })
                }
            }else{
                console.log("No tutor found!")
            }
        })

    }
    catch(err){
        console.log(err)
    }
}

const Read_Bookings = (req, res) => {
     
    const id = req.body.uid;
    try {
       Bookings.find( { Tutor_Id: { $in: [ id ] } } )
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

const Update_Status = async (req, res) => {
    const id = req.body.id;
    const status = req.body.st;
    try {
        
        if (!id && !status) {
            res.json({ message: "Oops! update was unsuccessful, our IT team is working on it now!", code: 024 })
        } else {

            const update = await Bookings.findOneAndUpdate({_id: id}, {$set: {Status: status}})
            if (update) {
                res.json({ message: "Successfuly updated status!", code: 111 })
            } else {
                res.json({ message: "Oops! update was unsuccessful, our IT team is working on it now!", code: 024 })
            }
            
        }

    } catch (error) {
        console.log(error);
    }
}

const New_Announcement = (req, res) => {
    const { status, module, message, id, T_Name, T_SName } = req.body.fd;

    console.log(req.body.fd)
   try {

    if (!status) {
        res.json({ message: "Oops! we got nothing!", code: 421 })
    } else {

        const Announce = new Announcement({
            Message: message,
            Type: status,
            Module: module,
            Tutor_id: id,
            Posted_By: T_Name + " " + T_SName
        })
        Announce.save()
        .then(() =>{

            if (status === "urgent") {

                Bookings.find( { Module: { $in: [ module ] } } )
                .then(x => {
                    x.forEach(element => {
                        if (element.Status == "Successful") {
                            SendAnnouncementDetails(T_Name, T_SName, element.Learner_Email, module, message)
                        }
                    });
                })
                .catch(errr => {
                    console.log(errr)
                })

            }

            res.json({ message: "Successfully made announcement!", code: 123 })
        })
        .catch(err => {
            console.log(err)
            res.json({ message: err.message, code: 421 })
        })

    }

   } catch (error) {
    console.log(error)
   }
}

const Read_Announcement = (req, res) => {

    const id = req.body.uid;
    try {
        Announcement.find( { Tutor_id: { $in: [ id ] } } )
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

const Delete_Announcement = (req, res) => {

    const id = req.body.id;

    try {
        
        if (!id) {
            res.json({ message: "Something went wrong, Failed to delete!", code: 452 })
        } else {
            Announcement.findByIdAndDelete({_id: id})
            .then(() =>{
                res.json({ message: "Successfully deleted!", code: 158 }) 
            })
            .catch((err) => {
                console.log(err)
            })
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    Tutor_application,
    Tutor_login,
    Tutor_home,
    Tutor_Logout,
    Tutor_Update,
    Tutor_FilalUpdate,
    Tutor_Profile,
    Read_Bookings,
    Update_Status,
    New_Announcement,
    Read_Announcement,
    Delete_Announcement
}