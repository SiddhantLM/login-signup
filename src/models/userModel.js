import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter your username(modified)"],
        unique: true
    },
    email: {
        type:String,
        required:[true, "please enter your email(modified)"],
        unique:true
    },
    password: {
        type:String,
        required:[true,"please enter the password (modified)"]
    },
    isVerified: {
        type:Boolean,
        default : false,
    },
    isAdmin: {
        type: Boolean,
        default : false,
    },
    forgotPassToken: String,
    forgotPassTokenExpiry : Date,
    verifyToken:String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.User || mongoose.model("User",userSchema);

export default User


