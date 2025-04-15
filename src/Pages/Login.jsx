import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userlogin } from '../api/authApi';
import toast from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await userlogin({ email, password });
            
            if (res.data.token && res.data.userFullName && res.data.userId){
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("userFullName",res.data.userFullName)
            localStorage.setItem("userId", res.data.userId);
            
            window.dispatchEvent(new Event("storage"))

            if(res.data.role === "admin"){
                navigate("/admin")
            }
            else{
                navigate("/");
            }
           
            } else{
                    toast.error("invalid responses from server")
            }
        }
         catch (error) {
            toast.error("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen  bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg flex overflow-hidden w-[700px] h-[400px] border border-black">
                {/* Left Section - Brand Name */}
                <div className="w-1/2 flex flex-col justify-center items-center  text-white rounded-l-lg">
                <h1 className="text-3xl font-extrabold text-black">Civic<span className='text-blue-400'>Eye</span></h1>
                <p className="text-center text-black mt-4 text-sm">Your platform to report, track, and resolve public issues with ease.</p>
                </div>

                {/* Right Section - Login Form */}
                <div className="w-1/2 flex flex-col justify-center p-6 ml-5">
                    <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder='Email'
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder='Password'
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-md "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                            Sign In
                        </button>
                    </form>
                    <p className="text-gray-600 text-center mt-4">
                        Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>Sign Up</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
