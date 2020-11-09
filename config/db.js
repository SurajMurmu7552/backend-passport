const mongoose =require('mongoose');

const connectDb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true ,
            useUnifiedTopology: true
        });
        console.log(`connected to ${conn.connection.host}`)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;