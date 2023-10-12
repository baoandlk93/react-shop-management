import GuestLayout from "../layout/guest/GuestLayout";
import Login from "../component/Login";
import Register from "../component/Register";
import Home from "../component/Home";
import Shop from "../component/Shop";
import MyChart from "../component/MyChart";
import AdminLayout from "../layout/admin/AdminLayout";
import Products from "../component/Products";

export const ROUT_DATA = [
  { path: "/", element: Home, layout: GuestLayout },
  { path: "/login", element: Login, layout: GuestLayout },
  { path: "/register", element: Register, layout: GuestLayout },
  { path: "/shop", element: Shop, layout: GuestLayout },
  { path: "/chart", element: MyChart, layout: GuestLayout },
  { path: "/admin", element: Products, layout: AdminLayout },
];