import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const EditCategory = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [category, setCategory] = useState(null);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const docRef = doc(db, 'category', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setCategory(data);
                    setName(data.name);
                    setSlug(data.slug);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [id]); // Khi id thay đổi, useEffect sẽ được gọi lại

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = doc(db, 'category', id);
            await updateDoc(docRef, { name, slug });
            console.log('Category updated successfully');
            alert("cập nhật danh mục thành công");
            // Sau khi cập nhật thành công, chuyển hướng về trang danh sách danh mục
            navigate('/categorylist');
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <div>
            {category ? (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Tên</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="slug">Slug</label>
                        <input type="text" className="form-control" id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Lưu</button>
                </form>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default EditCategory;
