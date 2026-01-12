import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    // get the user details from frontend
    // validation like Empty 
    // check if user is already exists - username and email
    // check for images and check for avatar
    //  upload them on cloudinary
    // create user object - create entry in db
    //  remove password and refresh token feild from response
    // check user creation
    // return res
    const { userName, fullName, email, password } = req.body;
    // if (userName===""){
    //     throw new ApiError(
    //         statusCode=401,
    //         message="username required",
    //     )
    // } this is a logic for begineers
    if ([userName, fullName, email, password].some((feilds) => feilds?.trim() === "")) {
        throw new ApiError(400, "All feilds required");
    }
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    });
    if (existedUser) {
        throw new ApiError(409, "User Already Exists");
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log(avatarLocalPath);
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }
    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover Image is required");
    }
    // upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!avatar) {
        throw new ApiError(400, "avatar is required");
    }
    const user = await User.create({
        userName,
        avatar: avatar.url,
        email,
        password,
        fullName: fullName.toLowerCase(),
        coverImage: coverImage?.url
    });
    const createdUser = await User.findById(user._id).select("-password -refreshTokens");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    return res.status(201).json(new ApiResponse(200, createdUser, "user registered successfully"));
});
export { registerUser };
