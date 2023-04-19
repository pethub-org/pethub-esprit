import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/navbar";
import LeftBar from "./components/leftBar/leftBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import RightBar from "./components/rightBar/rightBar";
import "./style.scss";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import Marketplace from "./pages/Marketplace";
import ProductList from "./pages/market/Prod";
import ProductDetail from "./pages/market/ProductDetail";
function App() {
  //dima disponible
  const Layout = () => {
    return (
      <div className="theme-dark">
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };
  //non connecté redirection
  const currentUser = true;
  const ProtectedRoute = ({ children }) => {
    //user non connecté

    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
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
          path: "/market",
          element: <ProductList />,
        },
        {
          path: "/market/:id",
          element: <ProductDetail />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
