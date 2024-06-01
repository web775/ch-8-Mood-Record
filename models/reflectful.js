const mongoose = require('mongoose')


const reflectfulSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    reflectful: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },

}, {
    timestamps: true
});

const reflectful = mongoose.model('Reflectful', reflectfulSchema);
module.exports = reflectful;