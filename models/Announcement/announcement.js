const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    Message: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Posted_On: {
        type: Date,
        requred: true,
        default: Date.now
    },
    Module: {
        type: String,
        required: true
    },
    Tutor_id: {
        type: String,
        required: true
    },
    Posted_By: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);