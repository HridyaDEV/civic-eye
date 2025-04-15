import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getComplaintById, updateComplaintStatus } from "../api/complaintApi"
import { ArrowLeftIcon } from "lucide-react"
import toast from "react-hot-toast"
import { jsPDF } from "jspdf"

function ComplaintDetails() {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const isAdmin = location.pathname.includes("/admin");

    useEffect(() => {
        async function fetchComplaint() {
            const data = await getComplaintById(id);
            setComplaint(data);
        }
        fetchComplaint();
    }, [id]);

    const handleUpdateStatus = async (status) => {
        try {
            const updatedComplaint = await updateComplaintStatus(id, status)
            if (updatedComplaint && updatedComplaint.message === "Complaint status updated") {
                setComplaint((prev) => ({ ...prev, status }))
                toast.success(`Complaint has been "${status}" successfully.`);
            } else {
                console.error("Failed to update status:", updatedComplaint.message);
                toast.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating complaint status:", error);
            toast.error("Something went wrong!");
        }
    };

    // Function to generate and download PDF
    const handleDownloadPDF = () => {
        if (!complaint) return;

        try {
            const doc = new jsPDF();

            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("Complaint Details", 20, 20);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.text(`Complaint Model: ${complaint.model}`, 20, 40);
            doc.text(`Description: ${complaint.complaint}`, 20, 50);
            doc.text(`Place: ${complaint.place}`, 20, 60);
            doc.text(`Date: ${new Date(complaint.date).toLocaleDateString()}`, 20, 70);
            doc.text(`Status: ${complaint.status}`, 20, 80);

            const pdfData = doc.output(); // Check if PDF is generated

            if (pdfData.length > 0) {
                doc.save(`Complaint-${id}.pdf`);
                toast.success("PDF downloaded successfully!");
            } else {
                toast.error("Failed to generate PDF!");
            }
        } catch (error) {
            console.error("Error downloading PDF:", error);
            toast.error("Failed to download PDF!");
        }
    };

    if (!complaint) {
        return <p className="text-center text-gray-500 mt-6">Loading complaint details...</p>;
    }

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-blue-600 transition mb-4 self-start ml-6"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
            </button>

            <h2 className="text-3xl font-bold mb-6">Complaint Details</h2>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
                <p className="text-lg">
                    <strong>Complaint Model:</strong> {complaint.model}
                </p>
                <p className="text-lg mt-2">
                    <strong>Description:</strong> {complaint.complaint}
                </p>
                <p className="text-lg mt-2">
                    <strong>Place:</strong> {complaint.place}
                </p>
                <p className="text-lg mt-2">
                    <strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}
                </p>
                <p className="text-lg mt-2">
                    <strong>Status:</strong> {complaint.status}
                </p>

                {complaint.proof && (
                    <div className="mt-4">
                        <strong>Proof:</strong>
                        {complaint.proof.endsWith(".mp4") || complaint.proof.endsWith(".mov") || complaint.proof.endsWith(".avi") ? (
                            <video
                                controls
                                className="w-full mt-2 rounded-lg"
                                style={{ maxHeight: "400px" }}
                            >
                                <source src={`http://localhost:5111${complaint.proof}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                src={`http://localhost:5111${complaint.proof}`}
                                alt="Complaint Proof"
                                className="w-full mt-2 rounded-lg"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }} // Hide if broken
                            />
                        )}
                    </div>
                )}
                {isAdmin && complaint.status !== "Solved" && complaint.status !== "Rejected" && (
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => handleUpdateStatus("Solved")}
                            className="bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Solve
                        </button>
                        <button
                            onClick={() => handleUpdateStatus("Rejected")}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Reject
                        </button>
                    </div>
                )}

                {/* PDF Download Button - Always Visible */}
                {isAdmin && (
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Download PDF
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ComplaintDetails;
