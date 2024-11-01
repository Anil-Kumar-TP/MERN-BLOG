import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex flex-col md:flex-row md:items-center p-3 container mx-auto gap-5'>
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-lg text-white '>MERN</span>
            BLOG
          </Link>
          <p className='text-sm mt-5'>This is a demo project.You can sign up with your email and password or with Google</p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput type='email' placeholder='Email' id='email' />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='Password' id='password' />
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit'>Sign Up</Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-red-500'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
