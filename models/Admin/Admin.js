const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Surname: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Token: {
        type: String,
        default: ''
    }

})



module.exports = mongoose.model("Admin", AdminSchema);