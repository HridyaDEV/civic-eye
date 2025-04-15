import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../api/userApi";
import { ArrowLeftIcon } from "lucide-react";

const AdminUserView = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, [id]); 

  const fetchUserDetails = async () => {
    try {
      const response = await getUserById(id);
      setUser(response.data || response);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-blue-600 transition p-4"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
      </button>

      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
          <h1 className="text-2xl font-semibold text-gray-800 border-b pb-3">
            User Details
          </h1>

          {user === null ? (
            <p className="text-gray-500 mt-6 text-center">Loading user details...</p>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">Name:</strong> {user.fullName}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">Email:</strong> {user.email}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">Mobile:</strong> {user.mobile}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">Address:</strong> {user.address || "N/A"}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">ID Number:</strong> {user.idnumber || "N/A"}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">ID Proof:</strong> {user.idproof || "N/A"}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">State:</strong> {user.state || "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserView;
