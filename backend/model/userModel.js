const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Plase add a name"]
    },
    email: {
        type: String,
        required: [true, "Plase add an email"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Plase add a Password"]
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model("User", userSchema);