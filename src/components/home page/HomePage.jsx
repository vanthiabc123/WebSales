import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [userEmail, setUserEmail] = useState(null);
const navigate=useNavigate();
    useEffect(() => {
        // Check if user is logged in
        const userEmailFromStorage = localStorage.getItem('user');
        if (userEmailFromStorage) {
            const userEmailObject = JSON.parse(userEmailFromStorage); // Parse JSON string to object
            setUserEmail(userEmailObject.email); // Access the email property of the object
        }else{
            navigate("/signin")
        }
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
        
    }, []); // Empty dependency array ensures the effect runs only once

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('user');
        // Set userEmail to null
        setUserEmail(null);
        navigate("/signin")
    };

    const addToCart = (product) => {
        // Tạo một bản sao của giỏ hàng hiện tại
        const updatedCart = [...cart];
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);
        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên
            updatedCart[existingProductIndex].quantity += 1;
            alert("Đã thêm vào giỏ hàng")
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng với số lượng là 1
            updatedCart.push({ ...product, quantity: 1 });
        }
        // Cập nhật giỏ hàng
        setCart(updatedCart);
        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // Không chuyển hướng ngay sau khi thêm vào giỏ hàng
    };

    return (
        <div>  
            <div id="preloader">
                <div className="jumper">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>  
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                <a href="index.html" className="logo">
                                    <img src="assets/images/logo.png"/>
                                </a>
                                <ul className="nav">
                                    <li className="scroll-to-section"><a href="#top" className="active">Trang Chủ</a></li>
                                    <li className="scroll-to-section"><a href="#men">Sản Phẩm</a></li>
                                    <li className="scroll-to-section"><a href="#women"> Nam</a></li>
                                    <li className="scroll-to-section"><a href="#kids"> Nữ</a></li>
                                    <li className="scroll-to-section"><Link to="/ShoppingCart">giỏ hàng</Link></li>
                                    <li className="scroll-to-section"> {userEmail ? (                                         
                                    <div style={{marginTop:"2px"}}>
                                        {/* Show user email */}
                                        <p style={{color:"var(--orange)"}}>Chào Mừng,<strong style={{fontSize:"17px"}}>{userEmail.split('@')[0]}</strong><button className="btn btn-danger" onClick={handleLogout}>Đăng Xuất</button></p>
                                       
                                        
                                    </div>
                                ) : (
                                    <div>
                                        {/* Show login link if user is not logged in */}
                                        <Link to="/signin">Đăng Nhập</Link>
                                    </div>
                                )}</li>
                                </ul>        
                                <a className='menu-trigger'>
                                    <span>Menu</span>
                                </a>
                               
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

<div className="main-banner" id="top">
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-6">
                <div className="left-content">
                    <div className="thumb">
                        <div className="inner-content">
                            <h4>We Are Hexashop</h4>
                            <span>Awesome, clean &amp; creative HTML5 Template</span>
                            <div className="main-border-button">
                                <a href="#">Purchase Now!</a>
                            </div>
                        </div>
                        <img src="assets/images/left-banner-image.jpg" alt=""/>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="right-content">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="right-first-image">
                                <div className="thumb">
                                    <div className="inner-content">
                                        <h4>Women</h4>
                                        <span>Best Clothes For Women</span>
                                    </div>
                                    <div className="hover-content">
                                        <div className="inner">
                                            <h4>Women</h4>
                                            <p>Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid.</p>
                                            <div className="main-border-button">
                                                <a href="#">Discover More</a>
                                            </div>
                                        </div>
                                    </div>
                                    <img src="assets/images/baner-right-image-01.jpg"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="right-first-image">
                                <div className="thumb">
                                    <div className="inner-content">
                                        <h4>Men</h4>
                                        <span>Best Clothes For Men</span>
                                    </div>
                                    <div className="hover-content">
                                        <div className="inner">
                                            <h4>Men</h4>
                                            <p>Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid.</p>
                                            <div className="main-border-button">
                                                <a href="#">Discover More</a>
                                            </div>
                                        </div>
                                    </div>
                                    <img src="assets/images/baner-right-image-02.jpg"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="right-first-image">
                                <div className="thumb">
                                    <div className="inner-content">
                                        <h4>Kids</h4>
                                        <span>Best Clothes For Kids</span>
                                    </div>
                                    <div className="hover-content">
                                        <div className="inner">
                                            <h4>Kids</h4>
                                            <p>Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid.</p>
                                            <div className="main-border-button">
                                                <a href="#">Discover More</a>
                                            </div>
                                        </div>
                                    </div>
                                    <img src="assets/images/baner-right-image-03.jpg"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="right-first-image">
                                <div className="thumb">
                                    <div className="inner-content">
                                        <h4>Accessories</h4>
                                        <span>Best Trend Accessories</span>
                                    </div>
                                    <div className="hover-content">
                                        <div className="inner">
                                            <h4>Accessories</h4>
                                            <p>Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid.</p>
                                            <div className="main-border-button">
                                                <a href="#">Discover More</a>
                                            </div>
                                        </div>
                                    </div>
                                    <img src="assets/images/baner-right-image-04.jpg"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<section className="section" id="men">
                <div className="container">
                    <h2 style={{ color: '#333', fontSize: '30px', fontWeight: 'bold', marginBottom: '20px', fontFamily: "revert-layer" }}>Product News</h2>
                    <div className="row">
                        {products.map((product) => (
                            <div className="col-md-3" key={product.id}>
                                <div className="card">
                                <Link to={`/productdetail/${product.id}`}> {/* Thêm đường dẫn đến trang chi tiết sản phẩm */}
                    <img
                        src={product.imageUrl}
                        className="card-img-top"
                        alt={product.username}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.username}</h5>
                                        <p className="card-text">{product.moTaInput}</p>
                                        <p className="card-text">Giá: {product.price}</p>
                                        <button className="btn btn-primary" onClick={() => addToCart(product)}>
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="men-item-carousel">
                    <div className="owl-men-item owl-carousel">
                        <div className="item">
                            <div className="thumb">
                                <div className="hover-content">
                                    <ul>
                                        <li><a href="single-product.html"><i className="fa fa-eye"></i></a></li>
                                        <li><a href="single-product.html"><i className="fa fa-star"></i></a></li>
                                        <li><a href="single-product.html"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <img src="assets/images/men-01.jpg" alt=""/>
                            </div>
                            <div className="down-content">
                                <h4>classNameic Spring</h4>
                                <span>$120.00</span>
                                <ul className="stars">
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                </ul>
                            </div>
                        </div>
                        <div className="item">
                            <div className="thumb">
                                <div className="hover-content">
                                    <ul>
                                        <li><a href="single-product.html"><i className="fa fa-eye"></i></a></li>
                                        <li><a href="single-product.html"><i className="fa fa-star"></i></a></li>
                                        <li><a href="single-product.html"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <img src="assets/images/men-02.jpg" alt=""/>
                            </div>
                            <div className="down-content">
                                <h4>Air Force 1 X</h4>
                                <span>$90.00</span>
                                <ul className="stars">
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                </ul>
                            </div>
                        </div>
                        <div className="item">
                            <div className="thumb">
                                <div className="hover-content">
                                    <ul>
                                        <li><a href="single-product.html"><i className="fa fa-eye"></i></a></li>
                                        <li><a href="single-product.html"><i className="fa fa-star"></i></a></li>
                                        <li><a href="single-product.html"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <img src="assets/images/men-03.jpg" alt=""/>
                            </div>
                            <div className="down-content">
                                <h4>Love Nana ‘20</h4>
                                <span>$150.00</span>
                                <ul className="stars">
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                </ul>
                            </div>
                        </div>
                        <div className="item">
                            <div className="thumb">
                                <div className="hover-content">
                                    <ul>
                                        <li><a href="single-product.html"><i className="fa fa-eye"></i></a></li>
                                        <li><a href="single-product.html"><i className="fa fa-star"></i></a></li>
                                        <li><a href="single-product.html"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <img src="assets/images/men-01.jpg" alt=""/>
                            </div>
                            <div className="down-content">
                                <h4>classNameic Spring</h4>
                                <span>$120.00</span>
                                <ul className="stars">
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section className="section" id="explore">
    <div className="container">
        <div className="row">
            <div className="col-lg-6">
                <div className="left-content">
                    <h2>Explore Our Products</h2>
                    <span>You are allowed to use this HexaShop HTML CSS template. You can feel free to modify or edit this layout. You can convert this template as any kind of ecommerce CMS theme as you wish.</span>
                    <div className="quote">
                        <i className="fa fa-quote-left"></i><p>You are not allowed to redistribute this template ZIP file on any other website.</p>
                    </div>
                    <p>There are 5 pages included in this HexaShop Template and we are providing it to you for absolutely free of charge at our TemplateMo website. There are web development costs for us.</p>
                    <p>If this template is beneficial for your website or business, please kindly <a rel="nofollow" href="https://paypal.me/templatemo" target="_blank">support us</a> a little via PayPal. Please also tell your friends about our great website. Thank you.</p>
                    <div className="main-border-button">
                        <a href="products.html">Discover More</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="right-content">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="leather">
                                <h4>Leather Bags</h4>
                                <span>Latest Collection</span>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="first-image">
                                <img src="assets/images/explore-image-01.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="second-image">
                                <img src="assets/images/explore-image-02.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="types">
                                <h4>Different Types</h4>
                                <span>Over 304 Products</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section className="section" id="social">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="section-heading">
                    <h2>Social Media</h2>
                    <span>Details to details is what makes Hexashop different from the other themes.</span>
                </div>
            </div>
        </div>
    </div>
    <div className="container">
        <div className="row images">
            <div className="col-2">
                <div className="thumb">
                    <div className="icon">
                        <a href="http://instagram.com">
                            <h6>Fashion</h6>
                            <i className="fa fa-instagram"></i>
                        </a>
                    </div>
                    <img src="assets/images/instagram-01.jpg" alt=""/>
                </div>
            </div>
            <div className="col-2">
                <div className="thumb">
                    <div className="icon">
                        <a href="http://instagram.com">
                            <h6>New</h6>
                            <i className="fa fa-instagram"></i>
                        </a>
                    </div>
                    <img src="assets/images/instagram-02.jpg" alt=""/>
                </div>
            </div>
            <div className="col-2">
                <div className="thumb">
                    <div className="icon">
                        <a href="http://instagram.com">
                            <h6>Brand</h6>
                            <i className="fa fa-instagram"></i>
                        </a>
                    </div>
                    <img src="assets/images/instagram-03.jpg" alt=""/>
                </div>
            </div>
            <div className="col-2">
                <div className="thumb">
                    <div className="icon">
                        <a href="http://instagram.com">
                            <h6>Makeup</h6>
                            <i className="fa fa-instagram"></i>
                        </a>
                    </div>
                    <img src="assets/images/instagram-04.jpg" alt=""/>
                </div>
            </div>
            <div className="col-2">
                <div className="thumb">
                    <div className="icon">
                        <a href="http://instagram.com">
                            <h6>Leather</h6>
                            <i className="fa fa-instagram"></i>
                        </a>
                    </div>
                    <img src="assets/images/instagram-05.jpg" alt=""/>
                </div>
            </div>
            <div className="col-2">
                <div className="thumb">
                    <div className="icon">
                        <a href="http://instagram.com">
                            <h6>Bag</h6>
                            <i className="fa fa-instagram"></i>
                        </a>
                    </div>
                    <img src="assets/images/instagram-06.jpg" alt=""/>
                </div>
            </div>
        </div>
    </div>
</section>
<div className="subscribe">
    <div className="container">
        <div className="row">
            <div className="col-lg-8">
                <div className="section-heading">
                    <h2>By Subscribing To Our Newsletter You Can Get 30% Off</h2>
                    <span>Details to details is what makes Hexashop different from the other themes.</span>
                </div>
                <form id="subscribe" action="" method="get">
                    <div className="row">
                      <div className="col-lg-5">
                        <fieldset>
                          <input name="name" type="text" id="name" placeholder="Your Name" required=""/>
                        </fieldset>
                      </div>
                      <div className="col-lg-5">
                        <fieldset>
                          <input name="email" type="text" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your Email Address" required=""/>
                        </fieldset>
                      </div>
                      <div className="col-lg-2">
                        <fieldset>
                          <button type="submit" id="form-submit" className="main-dark-button"><i className="fa fa-paper-plane"></i></button>
                        </fieldset>
                      </div>
                    </div>
                </form>
            </div>
            <div className="col-lg-4">
                <div className="row">
                    <div className="col-6">
                        <ul>
                            <li>Store Location:<br/><span>Sunny Isles Beach, FL 33160, United States</span></li>
                            <li>Phone:<br/><span>010-020-0340</span></li>
                            <li>Office Location:<br/><span>North Miami Beach</span></li>
                        </ul>
                    </div>
                    <div className="col-6">
                        <ul>
                            <li>Work Hours:<br/><span>07:30 AM - 9:30 PM Daily</span></li>
                            <li>Email:<br/><span>info@company.com</span></li>
                            <li>Social Media:<br/><span><a href="#">Facebook</a>, <a href="#">Instagram</a>, <a href="#">Behance</a>, <a href="#">Linkedin</a></span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<footer>
    <div className="container">
        <div className="row">
            <div className="col-lg-3">
                <div className="first-item">
                    <div className="logo">
                        <img src="assets/images/white-logo.png" alt="hexashop ecommerce templatemo"/>
                    </div>
                    <ul>
                        <li><a href="#">16501 Collins Ave, Sunny Isles Beach, FL 33160, United States</a></li>
                        <li><a href="#">hexashop@company.com</a></li>
                        <li><a href="#">010-020-0340</a></li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-3">
                <h4>Shopping &amp; Categories</h4>
                <ul>
                    <li><a href="#">Men’s Shopping</a></li>
                    <li><a href="#">Women’s Shopping</a></li>
                    <li><a href="#">Kid's Shopping</a></li>
                </ul>
            </div>
            <div className="col-lg-3">
                <h4>Useful Links</h4>
                <ul>
                    <li><a href="#">Homepage</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Help</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </div>
            <div className="col-lg-3">
                <h4>Help &amp; Information</h4>
                <ul>
                    <li><a href="#">Help</a></li>
                    <li><a href="#">FAQ's</a></li>
                    <li><a href="#">Shipping</a></li>
                    <li><a href="#">Tracking ID</a></li>
                </ul>
            </div>
            <div className="col-lg-12">
                <div className="under-footer">
                    <p>Copyright © 2022 HexaShop Co., Ltd. All Rights Reserved. 
                    
                    <br/>Design: <a href="https://templatemo.com" target="_parent" title="free css templates">TemplateMo</a></p>
                    <ul>
                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                        <li><a href="#"><i className="fa fa-behance"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</footer>

</div>

  )
}

export default HomePage