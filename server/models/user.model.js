const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        firstName : {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [2, "{PATH} must be at least {MINLENGTH} characters."],
        },

        lastName : {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [2, "{PATH} must be at least {MINLENGTH} characters."],
        },

        email : {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [5, "{PATH} must be at least {MINLENGTH} characters."],
        },

        password : {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [6, "{PATH} must be at least {MINLENGTH} characters."],
        },

        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        },

        bands : {
            type: Array
        }
    },
        { timestamps: true }
);

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
    });

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
        });
    });

const User = mongoose.model("user", UserSchema);
module.exports = User;