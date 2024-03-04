import { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Header from '../header/Header';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productList = [];
                querySnapshot.forEach((doc) => {
                    productList.push({ id: doc.id, ...doc.data() });
                });
                setProducts(productList);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    const handleDeleteProduct = async (id) => {
        try {
            await deleteDoc(doc(db, 'products', id));
            setProducts(prevUserList => prevUserList.filter(product => product.id !== id));
            alert("xóa sản phẩm thành công")
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    return (
        <div className="container">
            <Header></Header>
            <h2 className="my-4">Danh sách sản phẩm</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.username}</td>
                            <td>{product.price}</td>
                            <td>{product.moTaInput}</td>
                            <td><img src={product.imageUrl} alt={product.username} style={{ maxWidth: '100px' }} /></td>
                            <td>
                                <button className='btn btn-danger' onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                                <Link to={`/editproduct/${product.id}`} className='btn btn-primary' style={{marginLeft:"10px"}}>Sửa</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           <a href="/addproduct">Thêm Sản Phẩm</a>
        </div>
    );
}

export default ProductList;
