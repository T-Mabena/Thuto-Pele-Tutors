const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    Learner_Name: {
        type: String,
        required: true
    },
    Learner_Surname: {
        type: String,
        required: true
    },
    Learner_Email: {
        type: String,
        required: true
    },
    Learner_Phone: {
        type: String,
        required: true
    },
    Learner_Id: {
        type: String,
        required: true,
    },
    Module: {
        type: String,
        required: true
    },
    Tutor_Id: {
        type: String,
        required: true
    },
    Tutor_Email: {
        type: String,
        required: true
    },
    Tutor_Name: {
        type: String,
        required: true
    },
    Tutor_Surname: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true,
        default: "Pending...",
    },
    Booking_Date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Bookings", BookingSchema);