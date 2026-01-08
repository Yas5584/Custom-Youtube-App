import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser=asyncHandler(async (req,res)=>{

// get the user details from frontend
// validation like Empty 
// check if user is already exists - username and email
// check for images and check for avatar

//  upload them on cloudinary
// create user object - create entry in db
//  remove password and refresh token feild from response
// check user creation
// return res

const {userName,fullName,email,password}=req.body;


// if (userName===""){
//     throw new ApiError(
//         statusCode=401,
//         message="username required",
//     )
// } this is a logic for begineers

if ([userName,fullName,email,password].some(
    (feilds)=>feilds?.trim()==="")){
        throw new ApiError(400,"All feilds required")
    }


  const existedUser=  User.findOne({
        $or:[{userName},{email}]
    })

    if (existedUser){
        throw new ApiError(409,"User Already Exists")
    }


    const avatarLocalPath =req.files?.avatar[0]?.path
    const coverImageLocalPath= req.files?.coverImage[0]?.path

    if (!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }

    if (!coverImageLocalPath){
        throw new ApiError(400,"Cover Image is required")
    }

    // upload on cloudinary
    uploadedAvatar=uploadOnCloudinary(avatarLocalPath)
    uploadedCoverImage=uploadOnCloudinary(coverImageLocalPath)




})







const loginUser=asyncHandler(async (req,res)=>{

    res.send("hello how are you")
})

export {registerUser,loginUser}