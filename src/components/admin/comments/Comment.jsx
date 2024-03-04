import React, { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Header from '../header/Header';

const Comment = () => {
    const [Comment, setComment] = useState([]);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'comments'));
                const Comments = [];
                querySnapshot.forEach((doc) => {
                    Comments.push({ id: doc.id, ...doc.data() });
                });
                setComment(Comments);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchComment();
    }, []);
    return (
        <div className="container">
            <Header></Header>
            <h2>Danh sách Bình Luận</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Tên</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Ngày Bình Luận</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {Comment.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.content}</td>
                            <td>{user.timestamp.toDate().toLocaleDateString()}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Comment;
