import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginSignup from "./pages/LoginSignup";
import AdminDashboard from "./pages/admindashboard/AdminDashboard";
import DashboardContent from "./pages/admindashboard/DashboardContent";
import Products from "./pages/admindashboard/Products";
import AddProduct from "./pages/admindashboard/AddProduct";
import EditProduct from "./pages/admindashboard/EditProduct";
import ViewProduct from "./pages/admindashboard/ViewProduct";
import Orders from "./pages/admindashboard/Orders";

import Customers from "./pages/admindashboard/Customers";
import EditCustomer from "./pages/admindashboard/EditCustomer";

import Employees from "./pages/admindashboard/Employees";
import EditEmployee from "./pages/admindashboard/EditEmployee";
import CreateEmployee from "./pages/admindashboard/CreateEmployee";

import Task from "./pages/admindashboard/Task";

import Notification from "./pages/admindashboard/Notifications";


import ImageUpload from "./pages/admindashboard/ImageUpload";

import Payment from "./pages/admindashboard/Payments";

import ProductDetail from "./components/landingpage/ProductDetail";
import ShopPage from "./components/landingpage/ShopPage";
import Cart from "./components/landingpage/Cart";
import Checkout from "./components/landingpage/Checkout";
import Order from "./components/landingpage/Orders";

import EmployeeDashboard from "./pages/employeedashboard/EmployeeDashboard";
import Dashboard from "./pages/employeedashboard/DashboardContent";
import OrderConfirmation from "./components/landingpage/OrderConfirmation";
import Profile from "./components/landingpage/Profile";
import PaymentHistory from "./components/landingpage/PaymentHistory";
import ProfileAdmin from "./pages/admindashboard/Profile";



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/my-account" element={<LoginSignup />} />

        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/orders/:orderId" element={<OrderConfirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payments" element={<PaymentHistory />} />


  


        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<DashboardContent />} />
          <Route path="dashboard" element={<DashboardContent />} />

          {/* Product Management */}
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="products/view" element={<ViewProduct />} />


          {/* Orders */}
           <Route path="orders" element={<Orders />} />
    

          {/* Customers */}
          <Route path="customers" element={<Customers />} />
          <Route path="customers/edit/:id" element={<EditCustomer />} />

          {/* Employees */}
          <Route path="employees" element={<Employees />} />
          <Route path="employees/edit/:id" element={<EditEmployee />} />
          <Route path="employees/create" element={<CreateEmployee />} />

          {/* Task */}
          <Route path="task" element={<Task />} />
 

          {/* Notifications */}
          <Route path="notifications" element={<Notification />} />

          {/* Image Upload */}
          

          <Route path="image-upload" element={<ImageUpload />} />


          <Route path="payments" element={<Payment />} />
          <Route path="profile" element={<ProfileAdmin />} />



          </Route>
          {/* Employees Dashboard*/}
          <Route path= "/employee" element={<EmployeeDashboard />} >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} /> 

          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="products/view" element={<ViewProduct />} />

          </Route>


      </Routes>
    </Router>
  );
};

export default App;




















































// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import LoginSignup from "./pages/LoginSignup";
// import AdminDashboard from "./pages/AdminDashboard";
// import DashboardContent from "./pages/DashboardContent";
// import Products from "./pages/Products";
// // import AddProduct from "./pages/AddProduct";
// // import EditProduct from "./pages/EditProduct";
// // import AllProducts from './pages/AllProducts';
// // import Categories from './pages/Categories';
// // import Inventory from './pages/Inventory';

// // import Orders from "./pages/Orders";
// // import PendingOrders from "./pages/PendingOrders";
// // import CompletedOrders from "./pages/CompletedOrders";
// // import Customers from "./pages/Customers";
// // import Feedback from "./pages/Feedback";
// // import Settings from "./pages/Settings";
// // import Employees from "./pages/Employees";
// // import Notifications from "./pages/Notifications";

// // import Roles from "./pages/Roles";

// // import Payments from "./pages/Payments";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/my-account" element={<LoginSignup />} />

//         {/* Admin Dashboard Routes */}
//         <Route path="/admin" element={<AdminDashboard />}>
//           <Route index element={<DashboardContent />} />
//           <Route path="dashboard" element={<DashboardContent />} />
//           <Route path="/products" element={<Products />} />
//           {/* <Route path="/products/add" element={<AddProduct />} /> */}
//           {/* <Route path="/products/edit/:id" element={<EditProduct />} /> */}
//           {/* <Route path="orders" element={<Orders />} />
//           <Route path="orders/all-orders" element={<Orders />} />
//           <Route path="orders/pending-orders" element={<PendingOrders />} />
//           <Route path="orders/completed-orders" element={<CompletedOrders />} />
//           <Route path="customers" element={<Customers />} />
//           <Route path="customers/feedback" element={<Feedback />} />
//           <Route path="employees" element={<Employees />} />
//           <Route path="employees/roles" element={<Roles />} />

//           <Route path="payments" element={<Payments />} />
//           <Route path="notifications" element={<Notifications />} />

//           <Route path="settings" element={<Settings />} /> */}
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;
