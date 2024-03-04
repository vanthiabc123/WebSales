import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase';
import Header from '../header/Header';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditProduct = () => {
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        price: '',
        moTaInput: '',
        imageUrl: '', // Thêm trường imageUrl để lưu trữ URL của hình ảnh
    });
    const [imageFile, setImageFile] = useState(null); // State để lưu trữ file ảnh mới
    const [imageUrl, setImageUrl] = useState(''); // State để lưu trữ URL của hình ảnh mới

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        username: data.username,
                        price: data.price,
                        moTaInput: data.moTaInput,
                        imageUrl: data.imageUrl, // Cập nhật URL của hình ảnh
                    });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]); // Khi id thay đổi, useEffect sẽ được gọi lại

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImageUrl(URL.createObjectURL(file)); // Tạo URL cho hình ảnh mới
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const { username, price, moTaInput } = formData;

            // Nếu có hình ảnh mới được chọn, tải ảnh lên Firebase Storage
            if (imageFile) {
                const storageRef = ref(storage, `image/${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                const url = await getDownloadURL(storageRef);
                setImageUrl(url); // Cập nhật URL của hình ảnh mới
            }

            // Cập nhật thông tin sản phẩm vào Firestore
            const docRef = doc(db, 'products', id);
            await updateDoc(docRef, {
                username,
                price,
                moTaInput,
                imageUrl: imageUrl || formData.imageUrl // Sử dụng URL hình ảnh mới nếu có, nếu không sử dụng URL cũ
            });

            console.log('Cập nhật sản phẩm thành công');

            // Chuyển hướng đến trang danh sách sản phẩm
            navigate("/listproduct");
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
        }
    };

    return (
        <div className="container">
            <Header />
            <form onSubmit={handleSubmit}>
                <h2 className="my-4">Chỉnh sửa sản phẩm</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Tên</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Giá</label>
                    <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="moTaInput" className="form-label">Mô Tả</label>
                    <textarea id="moTaInput" name="moTaInput" value={formData.moTaInput} onChange={handleChange} className="form-control" required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Hình ảnh mới</label>
                    <input type="file" id="image" name="image" onChange={handleImageChange} className="form-control" />
                    {imageUrl && <img src={imageUrl} alt="Preview" style={{ marginTop: 10, maxWidth: 200 }} />} {/* Hiển thị ảnh mới */}
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Lưu</button>
                </div>
            </form>
        </div>
    );
}

export default EditProduct;
