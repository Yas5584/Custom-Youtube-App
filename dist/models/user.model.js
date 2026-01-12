import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "This is a required Feild"]
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    avatar: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    refreshTokens: {
        type: String,
    }
}, { timeStamps: true });
// here pre is a type of middleware
// preBuild middleware hooks
// userSchema.pre("save",async function (next) {
//    if (!this.isModified("password")) return next();
//    try {
//     this.password = await bcrypt.hash(this.password,10)
//     next()
//    }
//    catch (error){
//     next(error)
//    }
// })
userSchema.pre("save", async function () {
    if (!this.isModified("password"))
        return;
    this.password = await bcrypt.hash(this.password, 10);
});
// lets define the Custom hooks
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessTokens = function () {
    jwt.sign({
        _id: this.id,
        userName: this.userName,
        email: this.email,
        fullName: this.fullName,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};
userSchema.methods.generateRefreshTokens = function () {
    jwt.sign({
        _id: this.id
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
};
export const User = mongoose.model("User", userSchema);
