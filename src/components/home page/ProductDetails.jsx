import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc, collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState(''); // Separate state to store the new comment being typed
    const [userName, setUserName] = useState('Default Username'); // Set a default value for userName

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docSnapshot = await getDoc(doc(db, 'products', id));
                if (docSnapshot.exists()) {
                    setProduct({ id: docSnapshot.id, ...docSnapshot.data() });
                } else {
                    console.log('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();

        const storedUserName = localStorage.getItem('username');
        if (storedUserName) {
            setUserName(storedUserName);
        } else {
            console.warn('Username not found in localStorage');
            localStorage.setItem('username', 'Default Username');
        }
       
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'comments'));
                const commentList = [];
                querySnapshot.forEach((doc) => {
                    commentList.push({ id: doc.id, ...doc.data() });
                });
                setComments(commentList);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, []);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value); // Store the new comment being typed
    };

    const handleSubmitComment = async (event) => {
        event.preventDefault();
        if (!userName) {
            console.error('Username not found');
            return;
        }
    
        try {
            const commentData = {
                username: userName,
                content: newComment,
                timestamp: Timestamp.fromDate(new Date())
            };
    
            // Thêm bình luận vào Firestore
            const commentRef = await addDoc(collection(db, 'comments'), commentData);
            console.log('Comment added with ID: ', commentRef.id);
    
            // Cập nhật danh sách bình luận
            const updatedComments = [...comments, { id: commentRef.id, ...commentData }];
            setComments(updatedComments);
    
            // Xóa nội dung bình luận sau khi gửi
            setNewComment('');
            alert("Thêm thành công")
        } catch (error) {
            console.error('Error adding comment: ', error);
        }
    };
    
    return (
        <div className="container mt-5">
            {product ? (
                <div className="row">
                    <div className="col-md-6">
                        <img src={product.imageUrl} alt={product.username} className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <h2>{product.username}</h2>
                        <p>Giá: {product.price}</p>
                        <p>{product.moTaInput}</p>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Bình luận</h3>
                            <form onSubmit={handleSubmitComment}>
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Nhập bình luận của bạn"
                                        value={newComment} // Use newComment as the value
                                        onChange={handleCommentChange}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Gửi</button>
                            </form>
                        </div>
                    </div>
                    {comments.map((commentItem) => (
                        <div key={commentItem.id} className="comment">
                            <strong>{commentItem.username}</strong>: {commentItem.content}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductDetails;
        