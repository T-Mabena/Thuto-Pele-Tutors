const mongoose = require('mongoose');
const LearnerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Surname: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Subjects: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Registered_On: {
        type: Date,
        required: true,
        default: Date.now,
    },
    Password: {
        type: String
    },
    is_Verified: {
        type: Number,
        default: 0
    },
    Token: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model("Learners", LearnerSchema);