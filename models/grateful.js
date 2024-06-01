const mongoose = require('mongoose')


const gratefulSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    grateful: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },

}, {
    timestamps: true
});

const Grateful = mongoose.model('Grateful', gratefulSchema);
module.exports = Grateful;