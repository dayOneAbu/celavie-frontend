import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";

// hooks
import { ProfileProvider } from "./hooks/useProfile";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "./hooks/useCart";

//pages
import {
  Login,
  HirePage,
  HomePage,
  AboutPage,
  MenuPage,
  Register,
  MealDetailPage,
  ProfilePage,
  CheckoutPage,
} from "./pages";
import Dashboard from "./pages/admin/Dashboard";
import { MealProvider } from "./hooks/useMeal";
import Me from "./pages/Me";
import Categories from "./pages/Categories";
import CategoryEditor from "./pages/admin/CategoryEditor";
import MenuEditor from "./pages/admin/MenuEditor";
import Orders from "./pages/admin/Orders";
import Comments from "./pages/admin/Comments";
import Customers from "./pages/admin/Customers";
import Stats from "./pages/admin/Stats";
import OrdersDetail from "./pages/admin/OrdersDetail";
import AddMenu from "./pages/admin/AddMenu";

import MealDashboard from "./pages/admin/MealDashboard";
import AdminLogin from "./pages/admin";
import { AdminProvider } from "./hooks/useAdmin";
import { OrderProvider } from "./hooks/useOrder";
import OrderPage from "./pages/OrderPage";
import Messages from "./pages/admin/Messages";

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <ProfileProvider>
            <AdminProvider>
              <MealProvider>
                <OrderProvider>
                  <Routes>
                    <Route exact path={"/"} element={<HomePage />} />
                    <Route exact path={"/login"} element={<Login />} />
                    <Route exact path={"/register"} element={<Register />} />
                    <Route exact path={"/profile"} element={<ProfilePage />} />
                    <Route exact path={"/profile/me"} element={<Me />} />
                    <Route exact path={"/about"} element={<AboutPage />} />
                    <Route exact path={"/menu"} element={<MenuPage />} />
                    <Route exact path={"/hire"} element={<HirePage />} />
                    <Route
                      exact
                      path={"/checkout"}
                      element={<CheckoutPage />}
                    />
                    <Route
                      exact
                      path={"/checkout/summary"}
                      element={<OrderPage />}
                    />

                    <Route path={"/menu/:slug"} element={<MealDetailPage />} />
                    <Route path={"/:slug"} element={<Categories />} />
                    <Route path={"admin"} element={<AdminLogin />} />
                    <Route
                      exact
                      path={"/admin/dashboard"}
                      element={<Dashboard />}
                    >
                      <Route
                        exact
                        path={"categoryEditor"}
                        element={<CategoryEditor />}
                      />
                      <Route path={"menuEditor"} element={<MenuEditor />}>
                        <Route path={"new"} element={<AddMenu />} />
                        <Route path={"all"} element={<MealDashboard />} />
                      </Route>
                      <Route path={"orders"} element={<Orders />}>
                        <Route path={":id"} element={<OrdersDetail />} />
                      </Route>

                      <Route path={"home"} element={<Stats />} />
                      <Route path={"comments"} element={<Comments />} />
                      <Route path={"customers"} element={<Customers />} />
                      <Route path={"messages"} element={<Messages />} />
                    </Route>
                  </Routes>
                </OrderProvider>
              </MealProvider>
            </AdminProvider>
          </ProfileProvider>
        </AuthProvider>
      </CartProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  );
}

export default App;
