import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (<div className="bg-blue-400 px-4 pt-4 pb-2 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-blue-300 shadow-sm px-6 py-4 flex items-center justify-between">
            <h1 className="text-lg font-bold text-blue-500">TaskFlow</h1>
            <div className="space-x-2 flex items-center justify-center">
                {
                    user && (
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 sm:block">{user.name}</span>
                            <span className="bg-blue-300 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">{user.role}</span>
                        </div>
                    )
                }

                <button onClick={handleLogout} className="bg-blue-400 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-500 transition">Logout</button>
            </div>
        </div>
    </div>)
}


export default Navbar