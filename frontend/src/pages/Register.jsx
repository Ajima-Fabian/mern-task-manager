import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { register } from "../services/authServices"


const Register = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState("")
    const [loading, setIsLoading] = useState(false)

    const {login} = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)
        try{
            const res = await register(form)
            login(res.data.token, res.data.user)
            navigate("/dashboard")
        } catch(err){
            console.log(err.response.data)
            setError(
                err.response?.data?.error ||
                "Something went wrong"
            )
        } finally {
            setIsLoading(false)
            setForm({
                name: '',
                email: '',
                password: ''
            })
        }
    }

    return (<div>
        <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-700 flex items-center justify-center p-4 flex-col">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">Task Forge</h1>
                <p className="text-center text-gray-500 mb-6">Create your account</p>
                {error && (
                    <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required 
                            />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                        type="email"
                        name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@gmail.com"
                            className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required 
                            />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                        type="password"
                        name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                         />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-400 text-white py-2 rounded-lg font-semibold hover:bg-blue-500 transition disabled:opacity-50">{loading ? "Creating account..." : "Register"}</button>
                </form>
                <p className="text-center text-gray-500 text-sm mt-6">Already have an account? <Link to={"/login"} className="text-blue-500 font-medium hover:underline">Login</Link></p>
            </div>
        </div>
    </div>)
}


export default Register