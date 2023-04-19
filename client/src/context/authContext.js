import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // const [auth, setAuth] = useState(
  //   JSON.parse(localStorage.getItem("user")) || null
  // );
  const [auth, setAuth] = useState({});

  // const BASE_URL = 'http://localhost:8080'

  // const refreshUser = async () => {
  // const user = JSON.parse(localStorage.getItem('user'))
  // const resposne = await axios.get(`${BASE_URL}/users/${user.id}`, {}, {
  //   headers: {
  //     'Authorization': `Bearer ${currentUser.token}`
  //   }
  // });
  // console.log({ resposne })

  // console.log('refresh user')
  // setCurrentUser()
  // }

  // const login = async ({ email, password }) => {
  //   try {
  //     const res = await axios.post(`${BASE_URL}/auth/login`, { email, password })

  //     setAuth({
  //       email: res.data.email,
  //       firstname: res.data.firstname,
  //       token: res.data.token,
  //       lastname: res.data.lastname,
  //       role: res.data.role,
  //       tokenVerison: res.data.tokenVerison,
  //       id: res.data._id,
  //       photos: res.data.photos,
  //       friendList: res.data.friendList,
  //       friendRequests: res.data.friendRequests,
  //       ban: res.data.ban,
  //       accountConfirmed: res.data.accountConfirmed,
  //     });

  //     return res.data.role;

  //   } catch (error) {
  //     throw Error(error.response.data.error);
  //   }
  // };

  // const refreshLoggedInUser = () => {
  //   axios.get(`http://localhost:8080/users/${currentUser.id}`, { headers: { Authorization: `Bearer ${currentUser.token}` } }).then(res => {
  //     console.log("refreshlogged", res.data)
  //     setCurrentUser(res.data.user)
  //   })
  // }
  // const refreshLoggedInUser = async () => {
  // console.log('refrehs user')
  // axios.get(`http://localhost:8080/users/${currentUser.id}`, { headers: { Authorization: `Bearer ${currentUser.token}` } }).then((res) => {
  //   console.log(res)
  // })
  // console.log('refresh user');
  // const res = await axios.get(`http://localhost:8080/users/${currentUser.id}`, { headers: { Authorization: `Bearer ${currentUser.token}` } });
  // setCurrentUser((prev) => {
  //   return {
  //     email: res.data.email,
  //     firstname: res.data.firstname,
  //     token: res.data.token,
  //     lastname: res.data.lastname,
  //     role: res.data.role,
  //     tokenVerison: res.data.tokenVerison,
  //     id: res.data._id,
  //     photos: res.data.photos,
  //     friendList: res.data.friendList,
  //     friendRequests: res.data.friendRequests,
  //     ban: res.data.ban,
  //     accountConfirmed: res.data.accountConfirmed,
  //   }
  // })
  // }

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(auth));
  // }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
