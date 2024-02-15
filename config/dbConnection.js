const mongoose = require('mongoose');

// MongoDB Connection
const mongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        .then(() => console.log("DB is connected"))
    } catch (error) {
        console.log(error);
    }
};
module.exports = mongodb;