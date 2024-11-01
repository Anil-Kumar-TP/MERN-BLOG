import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to DB');
}).catch((error) => {
    console.log('error connecting to DB', error);
});

const app = express();


app.listen(3000, () => {
    console.log('server running on port 3000');
})

