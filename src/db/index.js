import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'


const connectDB=async()=>{

    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MongoDb connected : DB Host to ${connectionInstance.connection.host}`);

    }
    catch (error){
        console.error(error.message);
        process.exit(1);
    }
    
}

export default connectDB;