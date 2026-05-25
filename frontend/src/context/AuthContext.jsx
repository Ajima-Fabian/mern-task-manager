import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/authServices";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token){
            setLoading(false)
            return
        }

        const fetchUser = async () => {
            try{
                const res = await getMe()
                setUser(res.data.user)
            } catch(err){
                console.log(err)
                localStorage.removeItem("token")
            } finally{
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    const login = (token, useData) => {
        console.log("Login function user", useData)
        localStorage.setItem("token", token)
        setUser(useData)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)