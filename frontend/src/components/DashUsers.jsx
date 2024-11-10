import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck,FaTimes} from 'react-icons/fa'

export default function DashUsers () {

    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    // console.log(userPosts);
    // console.log(userPosts.length);
    // console.log(postIdToDelete);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user/getusers');
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (currentUser.isAdmin) {
            fetchUsers();
        }

    }, [currentUser]);

    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users]);
                if (data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // const handleDeleteUser = async () => {
    //     setShowModal(false);
    //     try {
    //         const res = await fetch(`/api/user/deleteuser/${userIdToDelete}/${currentUser._id}`, {
    //             method: 'DELETE'
    //         });
    //         const data = await res.json();
    //         if (!res.ok) {
    //             console.log(data.message);
    //         } else {
    //             setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date Created</Table.HeadCell>
                            <Table.HeadCell>User Image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Is Admin</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                        {users && users.map((user) => (
                            <Table.Body className='divide-y' key={user._id}>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                                    
                                    <Table.Cell>
                                        <img src={user.profilePicture} alt="pp" className='w-20 rounded-full h-10 object-cover bg-gray-500' />
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.username}
                                    </Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>{user.isAdmin ? <FaCheck className='text-green-500' /> : <FaTimes className='text-red-500' />}</Table.Cell>
                                    <Table.Cell>
                                        <span className='text-red-700 font-medium hover:underline cursor-pointer'
                                            onClick={() => { setShowModal(true); setUserIdToDelete(user._id); }}
                                        >Delete</span>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    {showMore && <button className='w-full text-rose-400 self-center text-sm py-7' onClick={handleShowMore}>Show More</button>}
                </>
            ) : (
                <p>No users yet!</p>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='4xl'>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are u sure u want to remove this user?</h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure'>Yes,I'm sure</Button>
                            <Button color='success' onClick={() => setShowModal(false)}>No,cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
