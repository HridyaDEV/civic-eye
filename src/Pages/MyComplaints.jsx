import React, { useEffect, useState } from 'react'
import { getUserComplaints } from '../api/complaintApi'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'

function MyComplaints() {

    const navigate = useNavigate()

    const [complaints, setComplaints] = useState([])

    useEffect(() => {

        async function fetchComplaints() {
            const data = await getUserComplaints()
            setComplaints(data.complaints || [])
        }
        fetchComplaints()
    }, [])

    return (
        <div className='flex flex-col items-center mt-8'>
             <button 
                onClick={() => navigate(-1)} 
                className="flex items-center text-gray-600 hover:text-blue-600 transition mb-4 self-start ml-6"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
            </button>
            <h2 className='text-2xl font-semibold mb-4'>My Complaints</h2>
            {complaints.length === 0 ? (
                <p>No complaints found!</p>
            ) : (
                <div className='w-3/4'>
                    <table className=' table-auto w-full border-collapse border border-gray-400y'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className="border border-gray-400 px-4 py-2">Model</th>
                                <th className="border border-gray-400 px-4 py-2">Complaint</th>
                                <th className="border border-gray-400 px-4 py-2">Place</th>
                                <th className="border border-gray-400 px-4 py-2">Submitted On</th>
                                <th className="border border-gray-400 px-4 py-2">Status</th>
                                <th className='border border-gray-400 px-4 py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint) => (
                                <tr key={complaint._id} className='text-center'>
                                    <td className="border border-gray-400 px-4 py-2">{complaint.model}</td>
                                    <td className="border border-gray-400 px-4 py-2">{complaint.complaint}</td>
                                    <td className="border border-gray-400 px-4 py-2">{complaint.place}</td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {new Date(complaint.createdAt).toLocaleDateString('en-IN', {
                                            day: '2-digit', month: 'short', year: 'numeric'
                                        })}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">{complaint.status}</td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <button 
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                          onClick={()=> navigate(`/viewcomplaint/${complaint._id}`)}  
                                        >
                                            View
                                        </button>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            
        </div>
    )
}

export default MyComplaints
