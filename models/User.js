const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    nom: {
        type: String,
    },
    prenom: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        // required: true,
    },
    password:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,

        default:true,
    },
    role: {
        type: String,
        default: "user",
    },
    
});
module.exports = mongoose.model("User", UserSchema);