const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    // every goal owns a user object (link with user model)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Goal', goalSchema);