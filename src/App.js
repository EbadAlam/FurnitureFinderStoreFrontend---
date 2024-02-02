import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import NotFound from './Components/NotFound/NotFound';
import CategoryPage from './Components/CategoryPage/CategoryPage';
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
import { useStateContext } from './contexts/ContextProvider';
import SellerAccount from './Components/Seller/SellerAccount/SellerAccount';

function App() {
  const [categories, setCategories] = useState();
  const [_error, setError] = useState();
  const {setUser,token} = useStateContext();
    
const fetchUser = () => {
  if (token) {
  
  axiosClient.get(`/user/${JSON.parse(localStorage.getItem('user_email'))}`)
    .then(({ data }) => {
      if (data && data.user) {
        setUser(data.user);
      } else {
        setUser(null); 
      }
    })
    .catch((errr) => {
        console.error(errr);
    })
  }
}
const fetchData = async () => {
  axiosClient.get('/categories/all')
  .then(({data}) => {
    setCategories(data.categories);
  })
  .catch((err) => {
    console.error(err);
  })
    // try {
    //     const apiUrl = process.env.REACT_APP_API_BASE_URL || process.env.API_BASE_URL;
    //     const response = await fetch(`${apiUrl}/categories/all`);

    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }

    //     const result = await response.json();
    //     setCategories(result.categories);
    // } catch (error) {
    //     setError(error);
    //     console.error(_error);
    // }
};
useEffect(() => {
  fetchData();
  fetchUser();
}, []);
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
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