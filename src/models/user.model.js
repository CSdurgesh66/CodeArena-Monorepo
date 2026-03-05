const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be empty'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email cannot be empty'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Please Enter the valid Email"
        }
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.comparePassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};


module.exports = mongoose.model('User', userSchema);