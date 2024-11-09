import React, { useState } from 'react'
import { Alert, Button, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate} from 'react-router-dom'

export default function CreatePost () {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
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
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' id='title' className='flex-1' placeholder='Title' required onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React JS</option>
            <option value="nextjs">Next JS</option>
          </Select>
        </div>
        <ReactQuill theme='snow' placeholder='Write something...' className='h-72 mb-12' required onChange={(value) => setFormData({ ...formData, content: value })} />
        <Button type='submit' gradientMonochrome='success'>Publish</Button>
        {publishError && (
          <Alert color='failure' className='mt-5'>{publishError}</Alert>
        )}
      </form>
    </div>
  )
}
