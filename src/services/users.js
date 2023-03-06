import axios from "axios";

const API_URL = "http://localhost:5000/users/";

const register = (user) => {
  return axios.post(API_URL + "register", user);
};

const login = async (userId, password) => {
  return axios.post(API_URL + "login", {
    userId,
    password,
  }).then(response=>response.data.user);
};

const logout = async()=>{
  return Promise.resolve();
}

const userService = {
  register,
  login,
  logout
};

export default userService;
