import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to DB');
}).catch((error) => {
    console.log('error connecting to DB', error);
});

const app = express();
app.use(express.json());
app.use(cookieParser())

app.listen(3000, () => {
    console.log('server running on port 3000');
})


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server error';
    res.status(statusCode).json({ success: false, statusCode, message });
});