import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    age: Number,
    city: String,
    country: String,
    hair: {
        color: String,
        "hairType": String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    console.log(this.password, 'before encryption')

    this.password = await bcrypt.hash(this.password, 8)

    console.log(this.password, 'after encryption')

})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;