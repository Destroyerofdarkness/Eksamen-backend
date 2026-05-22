const mongoose = require("mongoose")


async function connectToMongoDb() {
    try {
        await mongoose.connect(process.env.mongoDb);
        console.log("Succesfully connected to MongoDb on collection: ",mongoose.connection.name);
    } catch (err) {
        console.log("Error on connecting to MongoDB", err)
    }
}

module.exports = connectToMongoDb