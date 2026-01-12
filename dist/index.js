// rquire('dotenv').config({path:'./.env'})
import connectDB from "./db/index.js";
import dotenv from 'dotenv';
import { app } from "./app.js";
dotenv.config({
    path: './.env'
});
connectDB()
    .then(() => {
    app.on("error", (err) => {
        console.log(err);
    });
    app.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`);
    });
})
    .catch((error) => {
    console.log("DB failed to connect", error);
});
// "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js",
// "test": "echo\"no test required \" && exit 0"
// (async()=>{
//     try {
//          await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//     }
//     catch (error) {
//         console.log(error);
//     }
// })()
