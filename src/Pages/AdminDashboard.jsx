import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { getComplaintModel, getComplaintStats } from "../api/complaintApi";

const AdminDashboard = () => {
  const [complaintStats, setComplaintStats] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await getComplaintStats();
    
        setComplaintStats([
          { name: "Total Complaints", count: statsResponse.totalComplaints || 0, color: "#f59e0b" },
          { name: "Pending Complaints", count: statsResponse.pendingComplaints || 0, color: "#ef4444" },
          { name: "Solved Complaints", count: statsResponse.solvedComplaints || 0, color: "#10b981" },
          { name: "Rejected Complaints", count: statsResponse.rejectedComplaints || 0, color: "#6b7280" }
        ]);
    
        const modelResponse = await getComplaintModel();
        console.log("Model Response:", modelResponse);
        setModelData(modelResponse || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Conditional rendering for loading state
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6 ml-64">
          <div>Loading...</div> 
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
       
          {Array.isArray(complaintStats) && complaintStats.length > 0 ? (
            complaintStats.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg border-l-4" style={{ borderColor: item.color }}>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-2xl font-bold">{item.count}</p>
              </div>
            ))
          ) : (
            <div>No complaint statistics available.</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Complaints by Category</h2>
            {Array.isArray(modelData) && modelData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={modelData} margin={{ bottom: 60, top: 10, right: 30, left: 20 }}>
                  <XAxis dataKey="name" interval={0} tick={{ angle: -25, textAnchor: "end", fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={35} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div>No data available for complaints by category.</div>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Complaints Status Breakdown</h2>
            {Array.isArray(complaintStats) && complaintStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={complaintStats} dataKey="count" cx="50%" cy="50%" outerRadius={100} label>
                    {complaintStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div>No data available for complaints status breakdown.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
