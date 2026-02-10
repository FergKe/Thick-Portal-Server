import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Connect to Database")
    } catch ( error ) {
        console.error( "Cannot connect to database", error );
        process.exit( 1 );
    };
};