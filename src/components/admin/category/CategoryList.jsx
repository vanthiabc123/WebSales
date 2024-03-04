import React, { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Header from '../header/Header';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'category'));
                const categoryList = [];
                querySnapshot.forEach((doc) => {
                    categoryList.push({ id: doc.id, ...doc.data() });
                });
                setCategories(categoryList);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);
    const handleDeleteCategory = async (id) => {
        try {
            await deleteDoc(doc(db, 'category', id));
            setCategories(prevUserList => prevUserList.filter(category => category.id !== id));
            console.log('Category deleted successfully');
            alert("xóa danh mục thành công")
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };
    return (
        <div className="container">
            <Header></Header>
            <h2>Danh sách danh mục</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Tên</th>
                        <th scope="col">Slug</th>
                        <th scope='col'>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>{category.slug}</td>
                            <td>
                                <button className='btn btn-danger'  onClick={()=>handleDeleteCategory(category.id)}>Xóa</button>
                                <Link to={`/editcategory/${category.id}`} className='btn btn-primary' style={{marginLeft:"10px"}}>Sửa</Link>
                            </td>                    
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href="/addcategory">Thêm Danh Mục</a>

        </div>
    );
}

export default CategoryList;
