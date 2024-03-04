import React, { useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword } from 'firebase/auth';

function RegistrationForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        const { email, password } = formData;
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            // Lưu thông tin người dùng vào local storage
            localStorage.setItem('user', JSON.stringify({ email }));
            const isAdmin = email === 'admin@gmail.com'; 
            if (isAdmin) {
                navigate("/addproduct");
            } else {
                navigate("/");
            }
            alert("Đăng nhập thành công");
        } catch (error) {
            alert("lỗi" + error)
        }
    };
    return (
        <div className="container d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="w-50 border p-4" style={{marginTop:"200px",background:"var(--white)"}}>
                <h2 className="text-center mb-4">Đăng Nhập</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu:</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Đăng Nhập</button>
                    <p className='mt-3'>Nếu chưa có tài khoản hãy đăng kí ngay <a href='/signup'>Đăng Kí</a></p>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;
