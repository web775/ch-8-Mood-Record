const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add the user name']
    },
    email: {
        type: String,
        required: [true, 'Please add the user email'],
    },
    password: {
        type: String,
        required: [true, 'Please add the user password']
    },

    /* image area start  */

    profileImage: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    
    /* image area end  */

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
