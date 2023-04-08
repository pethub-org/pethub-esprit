import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const BASE_URL = 'http://localhost:8080'

  const refreshUser = async () => {
    // const user = JSON.parse(localStorage.getItem('user'))
    // const resposne = await axios.get(`${BASE_URL}/users/${user.id}`, {}, {
    //   headers: {
    //     'Authorization': `Bearer ${currentUser.token}`
    //   }
    // });
    // console.log({ resposne })

    // console.log('refresh user')
    // setCurrentUser()
  }

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password })
      setCurrentUser({
        email: res.data.email,
        firstname: res.data.firstname,
        token: res.data.token,
        lastname: res.data.lastname,
        role: res.data.role,
        tokenVerison: res.data.tokenVerison,
        id: res.data._id,
        photos: res.data.photos
      });
      return res.data.role;

    } catch (error) {
      throw Error(error.response.data.error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
