import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';
import toast from 'react-hot-toast';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        dob: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {}

        if (!formData.fullName) {
            newErrors.fullName = "Full Name is required "
        }
        if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Enter a valid 10-digit Mobile Number"
        }
        if (!formData.dob) {
            newErrors.dob = "Date of birth is required"
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid Email"
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }
        setError(newErrors)
        return Object.keys(newErrors).length === 0
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            try {

                const response = await register(formData)

                if (response.status === 201) {
                    toast.success("Sign up Successful!")

                    // Store token and user details in localStorage
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userFullName", formData.fullName);
                    localStorage.setItem("userEmail", formData.email);

                    navigate("/"); // Redirect to homepage
                    window.dispatchEvent(new Event("storage"));  //Notify other components that localStorage has changed
                } else {
                    setError({ general: response.data.error || "Registration failed" })
                }
            } catch (error) {

                setError({ general: "Registration failed" })
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg flex overflow-hidden w-[700px] h-[500px] border border-black">
                <div className="w-1/2 flex flex-col justify-center items-center text-white rounded-l-lg">
                    <h1 className="text-3xl font-extrabold text-black">Civic<span className='text-blue-400'>Eye</span></h1>
                    <p className="text-center text-black mt-4 text-sm">Your platform to report, track, and resolve public issues with ease.</p>
                </div>
                <div className="w-1/2 flex flex-col justify-center p-6 ml-5">
                    <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
                    {error.general && <p className="text-red-500 text-center">{error.general}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text" name="fullName" placeholder='Full Name'
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={formData.fullName} onChange={handleChange}
                            />
                            {error.fullName && <p className="text-red-500 text-sm">{error.fullName}</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="text" name="mobile" placeholder='Mobile Number'
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={formData.mobile} onChange={handleChange}
                            />
                            {error.mobile && <p className="text-red-500 text-sm">{error.mobile}</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="date" name="dob" placeholder='Date of Birth'
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={formData.dob} onChange={handleChange}
                            />
                            {error.dob && <p className="text-red-500 text-sm">{error.dob}</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="email" name="email" placeholder='Email'
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={formData.email} onChange={handleChange}
                            />
                            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="password" name="password" placeholder='Password'
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={formData.password} onChange={handleChange}
                            />
                            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                            Sign Up
                        </button>
                    </form>
                    <p className="text-gray-600 text-center mt-4">
                        Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Log in</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
