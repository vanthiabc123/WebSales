import React, { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    const [cart, setCart] = useState([]);
    const [userData, setUserData] = useState({
        phone: '',
        address: '',
        fullName: '',
        paymentMethod: 'Thanh toán khi nhận hàng'
    });
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        updateCartFromLocalStorage();
    }, []);

    useEffect(() => {
        calculateTotalPrice();
    }, [cart]);

    const updateCartFromLocalStorage = () => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    };

    const calculateTotalPrice = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        setTotalPrice(total);
    };

    const placeOrder = async () => {
        try {
            await addDoc(collection(db, 'orders'), {
                cart,
                totalPrice,
                createdAt: serverTimestamp(),
                userData
            });

            setCart([]);
            localStorage.removeItem('cart'); 
            alert('Đặt hàng thành công!');
            navigate('/');
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            alert('Đặt hàng thất bại. Vui lòng thử lại sau.');
        }
    };

    const increaseQuantity = (index) => {
        const newCart = [...cart];
        newCart[index].quantity += 1;
        setCart(newCart);
    };

    const decreaseQuantity = (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
            setCart(newCart);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    return (
        <div className="container mt-4">
            <h2>Giỏ hàng của bạn</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Số điện thoại:</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Địa chỉ:</label>
                    <input type="text" className="form-control" id="address" name="address" value={userData.address} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Họ và tên:</label>
                    <input type="text" className="form-control" id="fullName" name="fullName" value={userData.email} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="paymentMethod" className="form-label">Hình thức thanh toán:</label>
                    <select className="form-select" id="paymentMethod" name="paymentMethod" value={userData.paymentMethod} onChange={handleInputChange}>
                        <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                        <option value="Chuyển khoản">Chuyển khoản</option>
                    </select>
                </div>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td><img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px' }} /></td>
                            <td>{item.username}</td>
                            <td>{item.price}</td>
                            <td>
                                <button className="btn btn-outline-secondary me-2" onClick={() => decreaseQuantity(index)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="btn btn-outline-secondary ms-2" onClick={() => increaseQuantity(index)}>+</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => removeItem(index)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="fw-bold">Tổng tiền: {totalPrice}</p>
            <a href="/" className="btn btn-primary me-2" onClick={updateCartFromLocalStorage}>Đặt Thêm</a>
            <button className="btn btn-success ml-3" onClick={placeOrder}>Đặt hàng</button>
        </div>
    );
};

export default ShoppingCart;
