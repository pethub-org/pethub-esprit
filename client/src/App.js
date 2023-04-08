import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
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
import { AuthContext } from "./context/authContext";
import Admin from "./pages/admin/Admin";
import EditProfile from './pages/admin/EditProfile';
import ConfirmAccount from './pages/admin/ConfirmAccount';
import ResetPassword from "./pages/reset-psasword/ResetPassword";
import ResetPasswordForm from "./pages/reset-password-form/ResetPasswordForm";
import Event from "./pages/Event/event";
import EditEvent from "./pages/Event/EditEvent";

function App() {
  const { currentUser } = useContext(AuthContext);

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
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    if (!currentUser.role === 'user') {
      return <Navigate to='/' />
    }
    if (!currentUser.role === 'admin') {
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
        }
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
