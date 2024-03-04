import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Header from '../header/Header';

function AddCategorys() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        slug: '',
        name: '',
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
        const { name, slug } = formData;
        try {
            await addDoc(collection(db, "category"), {
                name,
                slug,
                createdAt: serverTimestamp(),
            });
            alert("Thêm danh mục thành công");
            navigate("/categorylist");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <Header></Header>
            <form onSubmit={handleSubmit}>
                <h2>Thêm Danh Mục</h2>
                <div className="mb-3">
                    <label htmlFor="slug" className="form-label">Slug</label>
                    <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên danh mục</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Thêm</button>
                </div>
            </form>
        </div>
    );
}

export default AddCategorys;
