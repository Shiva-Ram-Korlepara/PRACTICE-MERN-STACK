const mongoose = require('mongoose');

const requesterSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    address: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    people: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Requester', requesterSchema);