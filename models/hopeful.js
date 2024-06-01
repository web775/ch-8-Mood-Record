const mongoose = require('mongoose')


const hopefulSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    hopeful: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },

}, {
    timestamps: true
});

const Hopeful = mongoose.model('Hopeful', hopefulSchema);
module.exports = Hopeful;