import mongoose from "mongoose";
import dns from 'node:dns';

// Minor issue with the node process dns
// This is a very minor work around
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectMondoDB = (uri: string) => {
    return mongoose.
    connect(uri).
    then(() => {console.log("MongoDB has connected successfully")}).
    catch((error: Error) => {
        throw new Error(error.message);
    });
}

export default connectMondoDB;
