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

  if (!user.verified) {
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
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
              {team?.members.map((members, index) => (
                <div key={index} className="border-red-500 border">
                  <p>Username :{members.username}</p>
                  <p>College Name :{members.collegeName}</p>
                  <p>Email :{members.email}</p>
                  <p>thaparEmail :{members.thaparEmail}</p>
                  <p>position :{members.position}</p>
                  <p>Phone Number : {members.phoneNumber}</p>
                  <p>RollNo : {members.rollNo}</p>
                  <p>verified : {members.verified ? "YES" : "NO"}</p>
                  <p>year : {members.year}</p>
                  {user.rollNo == team.leaderRollNo && <Button onClick={() => handleDeleteMember(members.id)}>Delete Member</Button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {joinRequest && joinRequest.length > 0 && user.rollNo == team?.leaderRollNo &&
        <div className="">
          <div className="">Team Join Requests</div>
          {joinRequest.map((joinRequest, index) => <div className="" key={index}>
            <p>{joinRequest.user.username}</p>
            <p>{joinRequest.user.rollNo}</p>
            <p>{joinRequest.user.email}</p>
            <p>{joinRequest.user.phoneNumber}</p>
            <p>Status: {joinRequest.status}</p>
            {joinRequest.status == "Pending" && (<>
              <Button onClick={() => handleReject(joinRequest.team.teamId, joinRequest.user.userId)}>Reject</Button>
              <Button onClick={() => handleAccept(joinRequest.team.teamId, joinRequest.user.userId)}>Accept</Button>
            </>)}
          </div>
          )}
        </div>}
    </div>
  );
}

export default DashboardPage;
