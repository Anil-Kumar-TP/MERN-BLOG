import React, { useEffect, useState } from 'react'
import { Alert, Button, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function UpdatePost () {
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();
    const { postId } = useParams();
    const { currentUser } = useSelector((state) => state.user);
    // console.log(formData);


    useEffect(() => {
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(error.message);
                    setPublishError(data.message)
                    return;
                } else {
                    setPublishError(null);
                    setFormData(data.posts[0]);
                }
            }

            fetchPost();
        } catch (error) {
            console.log(error.message);
        }
    },[postId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                setTimeout(() => setPublishError(null), 3000);
            } else {
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        } catch (error) {
            setPublishError('Something went wrong');
            setTimeout(() => setPublishError(null), 3000);
        }
    }

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text' id='title' className='flex-1' placeholder='Title' required onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title} />
                    <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })} value={formData.category}>
                        <option value="uncategorized">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">React JS</option>
                        <option value="nextjs">Next JS</option>
                    </Select>
                </div>
                <ReactQuill theme='snow' placeholder='Write something...' className='h-72 mb-12' required onChange={(value) => setFormData({ ...formData, content: value })} value={formData.content} />
                <Button type='submit' gradientMonochrome='success'>Update</Button>
                {publishError && (
                    <Alert color='failure' className='mt-5'>{publishError}</Alert>
                )}
            </form>
        </div>
    );
};
