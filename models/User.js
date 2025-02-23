import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const schema = new mongoose.Schema({

    // Name type, required
    name: {
        type: String,
        required: [true,"Please Enter your Name"],
    },
    // Email type, required, unique, validator
    email: {
        type: String,
        required: [true,"Please Enter your Email"],
        unique: true,
        validator: validator.isEmail,
    },
    // Password type, required, minlength, select
    password: {
        type: String,
        required: [true,"Please Enter your Password"],
        minlength: [8,"password must be at least 8 characters"],
        select: false,
    },
    // Role type, enum, default
    role: {
        type: String,
        enum: ["admin","user"],
        default: "user",
    },
    // subscription id,status
    subscription: {
        id: String,
        status: String,
    },
    // Avtar public_id, url
    avatar: {
        public_id: {
            type: String,
            required: [true],
        },
        url: {
            type: String,
            required: [true],
        },
    },
    // Playlist [CourseId, Poster]
    playlist: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
            poster: String,
        }
    ],
    // createdAt type, default
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // ResetPasswordToken
    resetPasswordToken: String,
    // ResetPasswordExpire
    resetPasswordExpire: String,
});

schema.pre("save",async function (next) {
    if (!this.isModified("password")) 
        return next();

    this.password = await bcrypt.hash(this.password,10);
    next();
});

schema.methods.getJWTToken = function () {
    return jwt.sign ({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
};

schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
};

schema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

export const User = mongoose.model("user", schema);