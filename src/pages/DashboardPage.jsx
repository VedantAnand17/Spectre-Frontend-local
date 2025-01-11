import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import api from "../api/api";
import { toast } from "react-toastify";

function DashboardPage({ closeDashboard, isDashboardOpen }) {
  const navigate = useNavigate();
  const { isLoggedIn, user, team, joinRequest, setJoinRequest, getUserTeam } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn])

  const getJoinRequest = async () => {
    const response = await api.get(`/teams/${team.teamToken}/join-requests`);
    setJoinRequest(response.data);
  }

  const handleAccept = async (teamId, userId) => {
    try {
      const response = await api.post(`/teams/${teamId}/respond-request?userId=${userId}&accept=true`)
      toast.success(response.data.message);
      getJoinRequest();
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  }

  const handleReject = async (teamId, userId) => {
    try {
      const response = await api.post(`/teams/${teamId}/respond-request?userId=${userId}&accept=false`)
      toast.success(response.data.message);
      getJoinRequest();
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  }

  const handleDeleteMember = async (userId) => {
    try {
      const response = await api.delete(`/teams/${team.id}/remove-member/${userId}`)
      toast.success(response.data.message);
      getUserTeam(user.teamName);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred. Please try again.");
    }
  }

  useEffect(() => {
    if (team) {
      getJoinRequest();
    }
  }, [team])

  useEffect(() => { }, [joinRequest])

  if (!user.verified || user.teamName === null || !isDashboardOpen) {
    return null;
  }

  if (!team) {
    return <div className="">Loading Team Details</div>
  }

  if (!user) {
    return <div className="">Loading User Details</div>
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-gray-900 p-8 rounded-xl w-11/12 max-w-6xl mt-10 max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={closeDashboard}
          className="absolute max-sm:top-10 top-4 right-4 text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          X
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700">Team Dashboard</h1>
          <p className="text-xl mt-2 text-white">Welcome, {user?.username}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Team Details</h2>
          <div className="space-y-4 text-white">
            <div className="flex justify-between">
              <p className="font-semibold">Team Name:</p>
              <p>{team?.teamName}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Team Leader:</p>
              <p>{team?.leaderName}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Team Tokrn:</p>
              <p>{team?.teamToken}</p>
            </div>
            <div className="mt-6">
              <p className="font-semibold mb-4">Team Members:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team?.members.map((member, index) => (
                  <div
                    key={index}
                    className="border border-gray-700 rounded-lg p-4 bg-gray-700"
                  >
                    {member.username && <p className="text-lg font-semibold">Username: {member.username}</p>}
                    {member.collegeName && <p className="text-sm">College: {member.collegeName}</p>}
                    {member.email && <p className="text-sm">Email: {member.email}</p>}
                    {member.phoneNumber && <p className="text-sm">Phone: {member.phoneNumber}</p>}
                    {member.rollNo && <p className="text-sm">Roll No: {member.rollNo}</p>}
                    <p className="text-sm">
                      Verified: <span className={member.verified ? "text-green-500" : "text-red-500"}>{member.verified ? "YES" : "NO"}</span>
                    </p>
                    {member.year && <p className="text-sm">Year: {member.year}</p>}
                    {user.rollNo === team.leaderRollNo && member.rollNo !== team.leaderRollNo && (
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Remove Member
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {joinRequest && joinRequest.length > 0 && user.rollNo === team?.leaderRollNo && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-blue-700 mb-4">Join Requests</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {joinRequest.map((request, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-lg p-4 bg-gray-700 text-white"
                >
                  {request.user.username && <p><strong>Username:</strong> {request.user.username}</p>}
                  {request.user.rollNo && <p><strong>Roll No:</strong> {request.user.rollNo}</p>}
                  {request.user.email && <p><strong>Email:</strong> {request.user.email}</p>}
                  {request.user.phoneNumber && <p><strong>Phone:</strong> {request.user.phoneNumber}</p>}
                  <p>
                    <strong>Status: </strong>
                    <span className={request.status === "PENDING" ? "text-yellow-500" : "text-green-500"}>{request.status}</span>
                  </p>
                  {request.status === "PENDING" && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleReject(request.team.teamId, request.user.userId)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleAccept(request.team.teamId, request.user.userId)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
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
    </div>
  );
}

export default DashboardPage;