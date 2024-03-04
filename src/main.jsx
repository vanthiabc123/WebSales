import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn.jsx';
import HomePage from './components/home page/HomePage.jsx';
import AddCategorys from './components/admin/category/AddCategorys.jsx';
import CategoryList from './components/admin/category/CategoryList.jsx';
import AddProduct from './components/admin/product/AddProduct.jsx';
import ProductList from './components/admin/product/ProductList.jsx';
import UserList from './components/admin/user/UserList.jsx';
import ShoppingCart from './components/home page/ShoppingCard.jsx'; // Sửa đường dẫn import
import OderProduct from './components/admin/oders/OderProduct.jsx';
import ProductDetails from './components/home page/ProductDetails.jsx';
import Comment from './components/admin/comments/Comment.jsx';
import Statistical from './components/admin/statistical/Statistical.jsx';
import EditCategory from './components/admin/category/EditCategory.jsx';
import EditProduct from './components/admin/product/EditProduct.jsx';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/addcategory',
    element: <AddCategorys />,
  },
  {
    path: '/categorylist',
    element: <CategoryList />,
  },
  {
    path: '/addproduct',
    element: <AddProduct />,
  },
  {
    path: '/listproduct',
    element: <ProductList />,
  },
  {
    path: '/listuser',
    element: <UserList />,
  },
  {
    path: '/shoppingcart', // Chỉnh sửa path để đúng với routing
    element: <ShoppingCart />,
  },
  {
    path:'/oderadmin',
    element:<OderProduct></OderProduct>
  },
  {
    path:'/productdetail/:id',
    element:<ProductDetails></ProductDetails>
  },
  {
    path:'/commentadmin',
    element:<Comment></Comment>
  },
  {
    path:'/thongke',
    element:<Statistical></Statistical>
  },
  {
    path:'/editcategory/:id',
    element:<EditCategory></EditCategory>
  },
  {
    path:'/editproduct/:id',
    element:<EditProduct></EditProduct>
  }
]);

ReactDOM.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
  document.getElementById('root')
);
