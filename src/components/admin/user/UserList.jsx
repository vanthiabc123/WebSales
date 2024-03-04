import React, { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Header from '../header/Header';

const UserList = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const userLists = [];
                querySnapshot.forEach((doc) => {
                    userLists.push({ id: doc.id, ...doc.data() });
                });
                setUserList(userLists);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchUsers();
    }, []);
const handleDeleteUser = async (id) => {
    try {
        await deleteDoc(doc(db, 'users', id));
        setUserList(prevUserList => prevUserList.filter(user => user.id !== id));
        console.log('User deleted successfully');
        alert("xóa thanh công")
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};
    return (
        <div className="container">
            <Header></Header>
            <h2>Danh sách Tài Khoản</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Tên</th>
                        <th scope="col">email</th>
                        <th scope="col">chức vụ</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => (
                        <tr key={user.id}>
                            <td>{user.displayName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button  className="btn btn-danger"  onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
