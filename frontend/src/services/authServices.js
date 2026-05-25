import API from '../api/axios'

export const register = (data) => API.post("/api/v1/auth/register", data)


export const login = (data) =>  API.post("/api/v1/auth/login", data)


export const getMe = () => API.get("/api/v1/auth/user")