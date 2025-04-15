import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getAllUsers } from "../api/userApi";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
    const navigate = useNavigate()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-semibold text-gray-800 border-b pb-3">
            User Management
          </h1>

          {/* Users Table */}
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-sm uppercase">
                  <th className="py-3 px-4 border">Name</th>
                  <th className="py-3 px-4 border">Email</th>
                  <th className="py-3 px-4 border">Mobile</th>

                  <th className="py-3 px-4 border">Action</th>
                
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="text-center border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 border">{user.fullName}</td>
                      <td className="py-3 px-4 border">{user.email}</td>
                      <td className="py-3 px-4 border">{user.mobile}</td>

                      <td className=" text-white">
                       <button className="bg-blue-400  border hover:bg-blue-600 px-3 py-1 rounded"
                       onClick={()=>navigate(`/admin/users/${user._id}`)}>View</button>
                      </td>
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-gray-500">
                      No registered users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
