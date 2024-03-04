import { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Header from '../header/Header';

function OderProduct() {
    const [oders, setOders] = useState([]);

    useEffect(() => {
        const fetchOders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'orders'));
                const odersList = [];
                querySnapshot.forEach((doc) => {
                    odersList.push({ id: doc.id, ...doc.data() });
                });
                setOders(odersList);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchOders();
    }, []);
    console.log(oders)
        return (
            <div className="container-fluid">
                <Header></Header>
                <h2 className="my-4">Danh sách đơn hàng</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Tên Người đặt</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Ngày đặt</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Hình Thức</th>


                            
                        </tr>
                    </thead>
                    <tbody>
                        {oders.map((order) => (
                            order.cart.map((product, index) => (
                                <tr key={index}>
                                    <td>{order.userData.fullName}</td>
                                    <td>{order.userData.phone}</td>
                                    <td>{product.quantity}</td>
                                    <td><img src={product.imageUrl} alt={product.username} style={{ maxWidth: '100px' }} /></td>
                                    <td>{product.username}</td>
                                    <td>{order.userData.address}</td>
                                    <td>{order.createdAt.toDate().toLocaleDateString()}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.userData.paymentMethod}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        
    );
}

export default OderProduct;
