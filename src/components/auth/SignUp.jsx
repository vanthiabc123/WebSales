import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = formData;
        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            await addDoc(collection(db, "users"), {
                email,
                createdAt: serverTimestamp(),
                displayName: formData.username,
                uid: auth.currentUser.uid,
                role: "user",
            });
            alert("Đăng ký thành công");
            navigate("/signin");
        } catch (error) {
            alert("Lỗi: " + error)
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form onSubmit={handleSubmit} className="mt-5 border p-4 rounded shadow">
                        <h2 className="text-center mb-4">Đăng ký</h2>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Tên người dùng</label>
                            <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Nhập lại mật khẩu</label>
                            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Đăng ký</button>
                            <p className='mt-3'>Nếu đã có tài khoản hãy đăng nhập ngay <a href='/signin'>Đăng Nhập</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
