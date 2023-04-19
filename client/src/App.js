import Register from "./pages/register/Register";

import Login from "./pages/login/Login";
import Navbar from "./components/navbar/navbar"
import LeftBar from "./components/leftBar/leftBar"
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import RightBar from "./components/rightBar/rightBar"
import "./style.scss"
import{RouterProvider,Route,createBrowserRouter, Outlet, Navigate} from 'react-router-dom';
function App() {

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

function App() {
  const { auth } = useAuth();



  //dima disponible
  const Layout = ()=>{
    return (
      <div className="theme-dark">
        <Navbar/>
         <div style={{display:"flex"}}>
          <LeftBar/>
          <div style={{flex:6}}>
          <Outlet/>
          </div>
          
          <RightBar/>
             
         </div>
      </div>
    )
  };

  //non connecté redirection
  const currentUser = true;
  const ProtectedRoute = ({children})=>{
    //user non connecté
    
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children
  }
  const router = createBrowserRouter([
    {
      path : "/login",
      element:<Login/>
    },
    {
      path:"/",
      element:
      <ProtectedRoute><Layout/></ProtectedRoute>,
      children:[


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
        path:"/",
        element:<Home/>
        },
        {
          path:"/profile/:username",
          element:<Profile/>
        }

      ]
    },
    {
      path:"/register",
      element:<Register/>
    }
  ])
  return (
    <div >
            <RouterProvider router={router}/>
    </div>
  );
}

export default App;
