import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { updateStart, updateSuccess, updateFailure,deleteAccountStart,deleteAccountSuccess,deleteAccountFailure,signoutSuccess } from '../redux/user/userSlice.js';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom';

export default function DashProfile () {
  
  const { currentUser,error,loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }

  // console.log(imageFile);
  // console.log(imageFileUrl);

  // useEffect(() => {
  //   if (imageFile) {
  //     uploadImage()
  //   }
  // }, [imageFile]);

  // const uploadImage = () => {

  // }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('Nothing to Update');
      setTimeout(() => setUpdateUserError(null), 3000);
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
        setTimeout(() => setUpdateUserError(null), 3000);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess('User Profile Updated');
        setTimeout(() => setUpdateUserSuccess(null), 3000);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
      setTimeout(() => setUpdateUserError(null), 3000);
    }
  }

  const handleDeleteAccount = async () => {
    setShowModal(false);
    try {
      dispatch(deleteAccountStart);
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteAccountFailure(data.message));
      } else {
        dispatch(deleteAccountSuccess(data));
      }
    } catch (error) {
      dispatch(deleteAccountFailure(error.message))
    }
  }

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
          <img src={imageFileUrl || currentUser.profilePicture} alt="Profile Pic" className='w-full h-full rounded-full border-8 border-[lightgray] object-cover' />
        </div>
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} onChange={handleChange} />
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' placeholder='Password' onChange={handleChange} />
        <Button type='submit' gradientDuoTone='greenToBlue' outline disabled={loading}>{loading ? 'loading' : 'Update'}</Button>
        {currentUser.isAdmin && (
          <Link to='/create-post'>
            <Button type='button' gradientMonochrome='purple' className='w-full'>Create a post</Button>
          </Link>
        )}
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer' onClick={() => setShowModal(true)}>Delete Account</span>
        <span className='cursor-pointer' onClick={handleSignOut}>Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>{updateUserError}</Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>{error}</Alert>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='4xl'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are u sure u want to delete your account?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteAccount}>Yes,I'm sure</Button>
              <Button color='success' onClick={() => setShowModal(false)}>No,cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
