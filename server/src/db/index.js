import mongoose from "mongoose"

export async function connectDB (url) {
    try {
        const connection = await mongoose.connect(url);
        if(connection) {
            console.log('Mongodb connection established on: ', mongoose.connection.host);
        }
    } catch (error) {
        console.log('Error while connecting to the mongodb: ', error)
    }
}