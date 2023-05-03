import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Admin from "./pages/admin/Admin";
import EditProfile from './pages/admin/EditProfile';
import ConfirmAccount from './pages/admin/ConfirmAccount';
import ResetPassword from "./pages/reset-psasword/ResetPassword";
import ResetPasswordForm from "./pages/reset-password-form/ResetPasswordForm";
import Event from "./pages/Event/event";
import EditEvent from "./pages/Event/EditEvent";
import SearchPage from "./pages/search/SearchPage";
import useAuth from './hooks/useAuth'
import HomeProduct from "./components/market/product/HomeProduct";
import ProductDetail from "./components/market/product/ProductDetail";
import FormScreen from "./components/market/product/Formscreen";
import Friends from "./pages/friends/Friends";
import Game from "./components/games/Game";
import UpdateProd from "./components/market/product/UpdateProd";
import Orderscreen from "./components/market/Order/Orderscreen";

import Groups from "./components/groups/Groups";

function App() {
  const { auth } = useAuth();

  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!auth) {
      return <Navigate to="/login" />;
    }
    if (!auth.role === 'user') {
      return <Navigate to='/' />
    }
    if (!auth.role === 'admin') {
      return <Navigate to='/dashboard' />
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/events",
          element: <Event />
        },
        {
          path: "/events/:id",
          element: <EditEvent />
        },
        {
          path: "/market",
          element: <HomeProduct />,
        },
        
        {
          path: "/games",
          element: <Game/>,
        },
        
        {
          path: "/groups",
          element: <Groups/>,
        },
        {
          path: "/market/:id",
          element: <ProductDetail />,
        },
        {
          path: "/addprod",
          element: <FormScreen />,
        },
        {
          path: "/friends",
          element: <Friends />,
        },
        {
          path: "/updateprod/:id",
          element: <UpdateProd/>,
        },
        {
          path: "/save",
          element: <Orderscreen/>,
        },
      ],
    },
    {
      path: "/auth/confirm/:token",
      element: <ConfirmAccount />
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/users/reset-password/:token",
      element: <ResetPasswordForm />,
    },
    {
      path: '/admin',
      element: <Admin />,
    },
    {
      path: '/admin/update/user/:id',
      element: <EditProfile />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
