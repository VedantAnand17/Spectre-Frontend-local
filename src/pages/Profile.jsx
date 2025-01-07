import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';
import EditProfile from './EditProfile';
import DashboardPage from './DashboardPage';

export default function Profile() {
    const { isLoggedIn, user, setUser, team, setTeam, getUserTeam, getUserById } = useContext(AuthContext); // Accessing user context
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn])

    useEffect(() => {
        if (user?.teamName) {
            getUserTeam(user?.teamName);
        }
    }, [])

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleDeleteTeam = async () => {
        try {
            const response = await api.delete(`/teams/${team.id}?userId=${user.id}`);
            // console.log(response);
            toast.success(response.data.message)
            getUserById(user.id);
            navigate("/team")
        } catch (error) {
            // console.log(error)
            toast.error('An error occurred. Try Again!');
        }
    }


    // Function to send verification token
    const sendVerificationToken = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/users/${user.id}/send-token`);
            // console.log(response);
            if (response) {
                toast.success(response.data || 'Verification token sent successfully!');
                setIsModalOpen(true); // Open modal for token verification
            } else {
                toast.error(response.data || 'Failed to send verification token.');
            }
        } catch (error) {
            // console.log(error)
            toast.error('An error occurred while sending the token.');
        } finally {
            setLoading(false);
        }
    };

    // Function to verify token
    const verifyToken = async () => {
        setLoading(true);
        try {
            const response = await api.post(`/users/${user.id}/verify/${token}`);
            // console.log(response.data.user);
            if (response.status === 200) {
                toast(response.message || 'Verification successful!');
                setUser(response.data.user)
                setIsModalOpen(false);
                setToken("")
            } else {
                toast(response.message || 'Failed to verify token.');
                setToken("")
            }
        } catch (error) {
            // console.log(error)
            toast('An error occurred while verifying the token.');
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     if(user){
    //         if(!user.verified){
    //             alert("Please verify your account to create or join a team.");
    //         }
    //     }
    // },[user])

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
                <p>Loading user details...</p>
            </div>
        );
    }

    return (
        <div className='w-screen min-h-screen relative'>

            <img src="https://cdn.discordapp.com/attachments/1314526467144814635/1324463344521973770/image_133.png?ex=67783e1c&is=6776ec9c&hm=3f832a8ce3609fc8d31d7379db8eb1af5bc30508dc40253d1ad302fe3cf50acd&" className='h-screen w-screen absolute' alt="" />

            {/* <img src="https://github.com/VedantAnand17/voidImages/blob/main/owaspLogo.png?raw=true" className='absolute ml-6 max-md:h-14' alt="" /> */}

            <div className="h-screen w-screen flex justify-center items-center">
                <div className="bg-[#030925] bg-opacity-80 h-[80vh] w-[80vw] rounded-3xl m-auto absolute">
                    <img src="https://cdn.discordapp.com/attachments/1314526467144814635/1324475206554878106/image_144.png?ex=67784928&is=6776f7a8&hm=37591d94f44758dbb593aaf67b5655afe0350db26257c1b81af2820f37e644ef&" className='absolute h-[80vh] w-[80vw]' alt="" />
                    {/* <img src="https://cdn.discordapp.com/attachments/1314526467144814635/1324485243419365478/Group_63.png?ex=67785281&is=67770101&hm=34b859a2239301c06f11d8947b55972bcf93a81cf3c86c8b1075e20eebd34d23&" className='absolute max-lg:h-64 max-lg:ml-2 max-sm:h-28 max-lg:mt-24 max-sm:mt-16 ' alt="" /> */}
                    {/* <img src="https://cdn.discordapp.com/attachments/1314526467144814635/1324474713656791153/image.png?ex=677848b3&is=6776f733&hm=ead44f68c8f81d594fa16904c3056d1a2d3f16b44ac52d4f548b89e91f25f3f4&" className='absolute max-lg:w-60 max-lg:h-60' alt="" />
                    <img src="https://cdn.discordapp.com/attachments/1314526467144814635/1324475555856515205/Ellipse_28.png?ex=6778497c&is=6776f7fc&hm=b6e6ae1edbad704e518fa3b971d9daa307b9faddcaa5539b153ad9c18ac37955&" className='absolute lg:pl-14 lg:pt-12 max-lg:w-32 max-lg:h-32 pl-10' alt="" /> */}
                    <div className="absolute text-6xl max-lg:text-4xl w-[80vw] text-white flex justify-center font-semibold">PROFILE</div>
                    <div className="flex flex-col items-center gap-10 rounded-3xl bg-opacity-80 max-lg:text-lg h-[80vh] justify-center text-white text-4xl" >
                        <div className="flex flex-col gap-4 max-sm:w-52 max-sm:pl-2">
                            {!user.verified && <div className='text-sm text-red-500'>Please verify your account to create or join a team.</div>}
                            {user.username && <div className="">Name: {user.username}</div>}
                            {user.email && <div className="">Email: {user.email}</div>}
                            {user.collegeName && <div className="">College: {user.collegeName}</div>}
                            {/* {user.thaparEmail && <div className="">College Mail ID: {user.thaparEmail}</div>} */}
                            {user.rollNo && <div className="">Roll Number: {user.rollNo}</div>}
                            {user.year && <div className="">Year: {user.year}</div>}
                            {user.phoneNumber && <div className="">Phone Number: {user.phoneNumber}</div>}
                            {user.teamName && <div className="">Team Name: {user.teamName}</div>}
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        {team && user.rollNo == team.leaderRollNo && <Button onClick={() => handleDeleteTeam()} className='absolute bottom-4 content-center bg-blue-700 hover:bg-blue-800 rounded-xl'>Delete team</Button>}
                        <Button onClick={() => { setIsEditModalOpen(true); getUserById(user.id) }} className='absolute bottom-4 left-2 bg-blue-700 hover:bg-blue-800 rounded-xl'>Edit Profile</Button>
                        <Button
                            title='Verify Your Self To Create or Join a Team'
                            onClick={sendVerificationToken}
                            className="absolute bottom-4 right-2 bg-blue-700 hover:bg-blue-800 rounded-xl"
                            disabled={user.verified || loading}
                        >
                            {loading ? 'Sending...' : user.verified ? 'Verified' : 'Verify Profile'}
                        </Button>
                    </div>
                </div>
            </div>
            {/* Modal for Token Verification */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h2 className="text-xl font-bold text-cyan-400 text-center mb-4">Verify Token</h2>
                        <input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Enter verification token"
                            className="w-full px-4 py-2 mb-4 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-700 text-cyan-400 rounded-md shadow hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={verifyToken}
                                className="px-4 py-2 bg-cyan-400 text-black rounded-md shadow hover:scale-105 transition-transform"
                                disabled={loading || !token.trim()}
                            >
                                {loading ? 'Verifying...' : 'Verify'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isEditModalOpen &&
                <EditProfile closeEditModal={closeEditModal} isEditModalOpen={isEditModalOpen} />
            }
            <DashboardPage />
        </div>
    );
}
