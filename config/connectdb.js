const mongoose = require('mongoose');

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_HERE = {
            dbName : 'Mood'   
        }
        await mongoose.connect(DATABASE_URL, DB_HERE)
        console.log('connect successfully', DATABASE_URL)
    } catch (error) {
        console.log('Error==>',error.message)
    }
}

module.exports = connectDB;