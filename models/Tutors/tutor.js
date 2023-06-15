const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Surname: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Date_Of_Birth: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Alt_Phone: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    About_Me: {
        type: String,
        required: true
    },
    Subject_Name: {
        type: String,
        required: true
    },
    Subject_Price: {
        type: String,
        required: true
    },
    Subject_Method: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Profile_Photo: {
        type: String,
        required: true
    },
    Registered_On: {
        type: Date,
        required: true,
        default: Date.now,
    },
    is_Verified: {
        type: Number,
        default: 0
    },
    Background_Checked: {
        type: String,
        default: "Pending..."
    },
    Token: {
        type: String,
        default: ''
    }

})



module.exports = mongoose.model("Tutors", TutorSchema);