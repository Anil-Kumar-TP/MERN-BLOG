import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createPost, deletePost, getPosts, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createPost);
router.get('/getposts', getPosts);
router.delete('/delete/:postId/:userId', verifyToken, deletePost);
router.put('/updatepost/:postId/:userId',verifyToken,updatePost)

export default router;