import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import api from "../api/api";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";

function DashboardPage() {
  const navigate = useNavigate();
  const { isLoggedIn, user, team, joinRequest, setJoinRequest, getUserTeam } = useContext(AuthContext);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn])

  const getJoinRequest = async () => {
    const response = await api.get(`/teams/${team.teamToken}/join-requests`);
    // console.log(response)
    setJoinRequest(response.data);
    // getJoinRequest();
  }

  const handleAccept = async (teamId, userId) => {
    try {
      const response = await api.post(`/teams/${teamId}/respond-request?userId=${userId}&accept=true`)
      // console.log(response)
      toast.success(response.data.message);
      getJoinRequest();
    } catch (error) {
      // console.log("Error occurred", error);
      toast.error(error.message || "An error occurred. Please try again.");
    }
  }

  const handleReject = async (teamId, userId) => {
    try {
      const response = await api.post(`/teams/${teamId}/respond-request?userId=${userId}&accept=false`)
      toast.success(response.data.message);
      // console.log(response)
      getJoinRequest();
    } catch (error) {
      // console.log("Error occurred", error);
      toast.error(error.message || "An error occurred. Please try again.");
    }
  }

  const handleDeleteMember = async (userId) => {
    try {
      const response = await api.delete(`/teams/${team.id}/remove-member/${userId}`)
      toast.success(response.data.message);
      // console.log(response)
      getUserTeam(user.teamName);
    } catch (error) {
      // console.log("Error occurred", error);
      toast.error(error.response.data.message || "An error occurred. Please try again.");
    }
  }

  useEffect(() => {
    if (team) {
      getJoinRequest();
    }
    // console.log(joinRequest)
    // console.log(team)
  }, [team])

  useEffect(() => { }, [joinRequest])

  if (!user.verified || user.teamName === null) {
    return
  }

  if (!team) {
    return <div className="">Loading Team Details</div>
  }

  if (!user) {
    return <div className="">Loading User Details</div>
  }


  return (
    <div className="min-h-screen bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
      {/* Dashboard Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-red-500">CTF Registration Portal</h1>
        <p className="text-xl mt-2">Welcome back to your dashboard, {user?.username}</p>
      </div>

      {/* CTF Registration Info Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 mt-8 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-500 mb-4">CTF Team Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="font-semibold">Registered Team:</p>
            <p>{team?.teamName ? team.teamName : "Not Registered to any Team"}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Team Leader:</p>
            <p>{team?.leaderName ? team.leaderName : "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Team Members:</p>
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team?.members.map((member, index) => (
                <div
                  key={index}
                  className="border border-gray-300 shadow-md rounded-lg p-4 bg-white hover:shadow-lg transition-shadow"
                >
                  <p className="text-lg font-semibold text-gray-800">Username: {member.username}</p>
                  <p className="text-sm text-gray-600">College Name: {member.collegeName}</p>
                  <p className="text-sm text-gray-600">Email: {member.email}</p>
                  <p className="text-sm text-gray-600">Thapar Email: {member.thaparEmail}</p>
                  <p className="text-sm text-gray-600">Position: {member.position}</p>
                  <p className="text-sm text-gray-600">Phone Number: {member.phoneNumber}</p>
                  <p className="text-sm text-gray-600">Roll No: {member.rollNo}</p>
                  <p className="text-sm text-gray-600">
                    Verified: <span className={member.verified ? "text-green-600" : "text-red-600"}>{member.verified ? "YES" : "NO"}</span>
                  </p>
                  <p className="text-sm text-gray-600">Year: {member.year}</p>
                  {user.rollNo === team.leaderRollNo && (
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete Member
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {joinRequest && joinRequest.length > 0 && user.rollNo === team?.leaderRollNo && (
        <div className="p-4 shadow-md bg-gray-900">
          <div className="mb-4 text-lg font-semibold text-white">Team Join Requests</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinRequest.map((request, index) => (
              <div
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
                key={index}
              >
                <p className="text-sm text-gray-800"><strong>Username:</strong> {request.user.username}</p>
                <p className="text-sm text-gray-800"><strong>Roll No:</strong> {request.user.rollNo}</p>
                <p className="text-sm text-gray-800"><strong>Email:</strong> {request.user.email}</p>
                <p className="text-sm text-gray-800"><strong>Phone Number:</strong> {request.user.phoneNumber}</p>
                <p className="text-sm text-gray-800">
                  <strong>Status: </strong>
                  <span className={request.status === "Pending" ? "text-yellow-600" : "text-green-600"}>{request.status}</span>
                </p>
                {request.status === "Pending" && (
                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={() => handleReject(request.team.teamId, request.user.userId)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAccept(request.team.teamId, request.user.userId)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Accept
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
