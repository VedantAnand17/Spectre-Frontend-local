import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

function TeamPage() {
    const [teamName, setTeamName] = useState("");
    const [teamToken, setTeamToken] = useState("");
    const [userJoinRequests, setUserJoinRequests] = useState(null);
    const navigate = useNavigate();
    const { isLoggedIn, user, setUser, setTeam } = useContext(AuthContext);
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn])

    const getJoinRequests = async () => {
        try {
            const response = await api.get(`/teams/${user.id}/joinRequests`);
            // console.log(response.data.joinRequests);
            setUserJoinRequests(response.data.joinRequests);
        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(() => {
        getJoinRequests();
    }, [])

    const handleDeleteRequest = async (teamId) => {
        try {
            const response = await api.delete(`/teams/${teamId}/joinRequests/${user.id}`);
            // console.log(response)
            toast.success(response.data.message)
        } catch (error) {
            // console.error("Error creating team:", error);
            toast.error("An error occurred. Please try again.");
        }
    }

    const handleCreateTeam = async () => {
        try {
            if (!user) {
                // console.error("User is not LoggedIn");
                return;
            }

            const { username, rollNo, phoneNumber } = user;

            // Get team name from the input box (assume it is already in the `teamName` state variable)
            if (!teamName) {
                // console.error("Team name is required");
                return;
            }

            // Construct the payload
            const payload = {
                teamName,
                leaderName: username,
                leaderRollNo: rollNo,
                leaderPhoneNo: phoneNumber,
            };

            // console.log("Payload to be sent:", payload);
            // console.log(JSON.stringify(payload))

            // Send data to the backend
            const response = await api.post("/teams/create", payload);


            const result = response;

            // console.log("Backend response:", result);

            // Handle backend response
            if (response.status === 200) {
                setTeam(result.data.teamDetails);
                toast.success("Team created successfully!");
                const updatedUser = await api.get(`/users/${user.id}`);
                setUser(updatedUser.data);
                navigate("/profile");
            } else {
                // console.error("Failed to create team:", result.message || "Unknown error");
                toast.error(result.message || "Failed to create team. Please try again.");
            }
        } catch (error) {
            // console.error("Error creating team:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleJoinTeam = async () => {
        if (teamToken == null || teamToken == "") {
            toast.error("Team token is required");
            return;
        }
        try {
            const response = await api.post(`/teams/${teamToken}/request-join`, { username: user.username, email: user.email })
            // console.log(response)
            if (response.status == 200) {
                toast.success(response.data.message);
                getJoinRequests();
            } else {
                toast.error(response.response.data.message);
            }
        } catch (error) {
            // console.error("Error creating team:", error);
            toast.error(error.response.data.message || "An error occurred. Please try again.");
        }
    };

    if (!user) {
        return <div className="">Loading</div>
    }

    return (
        <div className="bg-gray-900 w-full mx-auto text-white min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Create Team Section */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Create a Team</h2>
                        <input
                            type="text"
                            placeholder="Enter team name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                            onClick={handleCreateTeam}
                            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Create Team 
                        </button>
                    </div>

                    {/* Join Team Section */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Join a Team</h2>
                        <input
                            type="text"
                            placeholder="Enter team token"
                            value={teamToken}
                            onChange={(e) => setTeamToken(e.target.value)}
                            className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                            onClick={handleJoinTeam}
                            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Send Join Request
                        </button>

                        {userJoinRequests &&
                            <div className="">
                                Join Requests
                                {userJoinRequests && userJoinRequests.map((request, index) =>
                                    <div key={index}>
                                        <p>requestStatus: {request.requestStatus}</p>
                                        <p>teamName: {request.team.teamName}</p>
                                        <p>leaderName: {request.team.leaderName}</p>
                                        <p>leaderPhoneNo: {request.team.leaderPhoneNo}</p>
                                        <p>leaderRollNo: {request.team.leaderRollNo}</p>
                                        <p>team size : {request.team.members.length} of 5</p>
                                        <Button onClick={() => handleDeleteRequest(request.team.id)}>Delete Request</Button>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamPage;
