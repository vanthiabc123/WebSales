    import { useState } from 'react';
    import { storage } from '../../firebase/firebase';
    import { uploadBytes, getDownloadURL, ref, getStorage } from 'firebase/storage';
    import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
    import { db } from '../../firebase/firebase';
    import { useNavigate } from 'react-router-dom';
    import Header from '../header/Header';

    function AddProduct() {
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            username: '',
            price: '',
            moTaInput: '',
            image: null,
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            setFormData(prevState => ({
                ...prevState,
                image: file
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(formData);
            try {
                const { username, price, image, moTaInput } = formData;

                // Tải ảnh lên Firebase Storage
                const storageInstance = getStorage();
                const storageRef = ref(storageInstance, `image/${image.name}`);
                await uploadBytes(storageRef, image);

                // Lấy URL của ảnh sau khi tải lên
                const imageUrl = await getDownloadURL(storageRef);

                // Lưu thông tin sản phẩm vào Firestore cùng với URL của ảnh
                await addDoc(collection(db, 'products'), {
                    username,
                    price,
                    imageUrl,
                    moTaInput,
                    createdAt: serverTimestamp(),
                });

                console.log('Thêm sản phẩm thành công');
                navigate("/listproduct"); // Chuyển hướng đến trang danh sách sản phẩm
            } catch (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
            }
        };

        return (
            <div className="container">
                <Header></Header>
                <form onSubmit={handleSubmit}>
                    <h2 className="my-4">Thêm sản phẩm</h2>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Tên</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Giá</label>
                        <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Hình Ảnh</label>
                        <input type="file" id="image" name="image" onChange={handleImageChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="moTaInput" className="form-label">Mô Tả</label>
                        <textarea id="moTaInput" name="moTaInput" value={formData.moTaInput} onChange={handleChange} className="form-control" required></textarea>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Thêm</button>
                    </div>
                </form>
            </div>
        );
    }

    export default AddProduct;
