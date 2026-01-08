import { v2 as cloudinary } from "cloudinary"
import fs from "fs";


 // Configuration
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY, 

        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary= async (localFileFath)=>{

    try {
       if (!localFileFath) {return null}

       const response= await cloudinary.uploader.upload(localFileFath,{resource_type:"auto"})
       console.log("File uploading on Url",response.url)
       return response
    }
    catch(error){
        // remove the locally saved temporary file as the upload operation got failed
        fs.unlinksync(localFileFath)
        



    }

}
export {uploadOnCloudinary}