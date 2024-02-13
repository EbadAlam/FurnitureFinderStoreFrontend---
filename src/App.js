import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import NotFound from './Components/NotFound/NotFound';
import CategoryPage from './Components/CategoryPage/CategoryPage';
import { useStateContext } from './contexts/ContextProvider';
import { useEffect, useState } from 'react';
import Signup from './Components/Signup/Signup';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import Users from './Components/Admin/Users/Users';
import Categories from './Components/Admin/Categories/Categories';
import AddCategory from './Components/Admin/Categories/AddCategory';
import Products from './Components/Admin/Products/Products';
import EditCategory from './Components/Admin/Categories/EditCategory';
import EditUser from './Components/Admin/Users/EditUser';
import SellerDashboard from './Components/Seller/Dashboard/Dashboard';
import SellerProducts from './Components/Seller/Products/Products';
import SellerEditProduct from './Components/Seller/Products/EditProducts';
import SellerAddProduct from './Components/Seller/Products/AddProducts';
import axiosClient from './axios-client';
import SellerAccount from './Components/Seller/SellerAccount/SellerAccount';
import EmailVerification from './Components/Seller/EmailVerification/EmailVerification';
import SellerManagers from './Components/Seller/Managers/Managers';
import SellerAddManagers from './Components/Seller/Managers/AddManagers';
import ManagerDashboard from './Components/Manager/Dashboard/Dashboard';
import ManagerProducts from './Components/Manager/Products/Products';
import ManagerAddProduct from './Components/Manager/Products/AddProducts';
import ProductDetail from './Components/ProductDetail/ProductDetail';

function App() {
  const [categories, setCategories] = useState();
  const { fetchUserData } = useStateContext();
    

const fetchData = async () => {
  axiosClient.get('/categories/all')
  .then(({data}) => {
    setCategories(data.categories);
  })
  .catch((err) => {
    console.error(err);
  })
};
useEffect(() => {
  fetchData();
  fetchUserData();
}, []);

  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
        {/* Master Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/categories/add" element={<AddCategory />} />
        <Route path="/admin/categories/edit/:categoryName" element={<EditCategory />} />
        <Route path="/admin/users/edit/:userId" element={<EditUser />} />
        <Route path="/admin/products" element={<Products />} />
        {/* Seller Admin Routes */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/products" element={<SellerProducts />} />
        <Route path="/seller/products/add" element={<SellerAddProduct />} />
        <Route path="/seller/products/edit/:productId" element={<SellerEditProduct />} />
        <Route path="/seller/account" element={<SellerAccount />} />
        <Route path="/seller/managers" element={<SellerManagers />} />
        <Route path="/seller/managers/add" element={<SellerAddManagers />} />
        {/* Manager Routes */}
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/products" element={<ManagerProducts />} />
        <Route path="/manager/products/add" element={<ManagerAddProduct />} />
        
        {/* Email Verification Route */}
        <Route path="/user/emailverification/:email/:_token" element={<EmailVerification />} />
        {/* Category Routes */}
        {categories && categories.length > 0 && (
          categories.map((category) => (
            <Route
                path={`/category/${category.cat_title}`}
                element={<CategoryPage categoryName={category.cat_title} />}
            />
        )))}
      </Routes>
    </Router>
  );
}

export default App;