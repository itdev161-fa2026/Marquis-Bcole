import mongoose from "mongoose";
import config from "config";


const db = config.get("mongoURI");

//connect to MangoDB
const connectDatabase = async () => {
    try {
        await mongoose.connect(db);
        console.log("connected to mongoDB");
    } catch (error){
        console.error(error.message);

        //exit with failure code
        process.exit(1);
    }
};

export default connectDatabase;