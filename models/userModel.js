import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    age: Number,
    city: String,
    country: String,
    hair :{
        color: String,
        "hairType" : String
    }
})

const User = mongoose.model('User', userSchema);

export default User;