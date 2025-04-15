import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import { getAllComplaints, updateComplaintStatus } from "../api/complaintApi"
import { useNavigate } from "react-router-dom"

const ComplaintsAdmin = () => {
  const [complaints, setComplaints] = useState([])
  const [filteredComplaints, setFilteredComplaints] = useState([])
  const [statusFilter, setStatusFilter] = useState("")
  const [modelFilter, setModelFilter] = useState("")
  const [searchText, setSearchText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const complaints = await getAllComplaints();
    if (Array.isArray(complaints)) {
      setComplaints(complaints);
      setFilteredComplaints(complaints);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    await updateComplaintStatus(id, status);
    fetchComplaints();
  };

  const handleFilter = () => {
    let filtered = complaints;

    if (statusFilter) {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    if (modelFilter) {
      filtered = filtered.filter((c) => c.model === modelFilter);
    }

    setFilteredComplaints(filtered);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    if (!searchText.trim()) {
      setFilteredComplaints(complaints);
      setCurrentPage(1);
      return;
    }
    const lowerSearch = searchText.toLowerCase();
    const searched = complaints.filter((c) =>
      Object.values(c).some((value) =>
        String(value).toLowerCase().includes(lowerSearch)
      )
    );
    setFilteredComplaints(searched);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchText("");
    setStatusFilter("");
    setModelFilter("");
    setFilteredComplaints(complaints);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h1 className="text-3xl font-semibold text-gray-800">
              Complaint Management
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 mb-6 items-center">
            <select
              className="border px-3 py-2 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Solved">Solved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              className="border px-3 py-2 rounded-md"
              value={modelFilter}
              onChange={(e) => setModelFilter(e.target.value)}
            >
              <option value="">All Models</option>
              {Array.from(new Set(complaints.map((c) => c.model))).map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>

            <button
              onClick={handleFilter}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Apply Filters
            </button>

            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border px-3 py-2 rounded-md"
            />

            <button
              onClick={handleSearch}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
            >
              Search
            </button>

            <button
              onClick={resetFilters}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
            >
              Reset
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white border border-black">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                  <th className="py-3 px-4 border">Model</th>
                  <th className="py-3 px-4 border">Complaint</th>
                  <th className="py-3 px-4 border">Place</th>
                  <th className="py-3 px-4 border">Submitted On</th>
                  <th className="py-3 px-4 border">Status</th>
                  <th className="py-3 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.length > 0 ? (
                  currentComplaints.map((complaint) => (
                    <tr
                      key={complaint._id}
                      className="text-center border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 border">{complaint.model}</td>
                      <td className="py-3 px-4 border">{complaint.complaint}</td>
                      <td className="py-3 px-4 border">{complaint.place}</td>
                      <td className="py-3 px-4 border text-gray-600">
                        {new Date(complaint.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td
                        className={`py-3 px-4 font-semibold ${
                          complaint.status === "Solved"
                            ? "text-green-600"
                            : complaint.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {complaint.status}
                      </td>
                      <td className="py-3 px-4 border-l flex justify-center space-x-2">
                        {complaint.status === "Pending" ? (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(complaint._id, "Solved")}
                              className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded-md"
                            >
                              Solve
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(complaint._id, "Rejected")}
                              className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-md"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to revert this complaint to Pending?"
                                )
                              ) {
                                handleUpdateStatus(complaint._id, "Pending")
                              }
                            }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1.5 rounded-md"
                          >
                            Revert
                          </button>
                        )}

                        <button
                          onClick={() => navigate(`/admin/viewcomplaint/${complaint._id}`)}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1.5 rounded-md"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-gray-500">
                      No complaints available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1.5 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsAdmin;