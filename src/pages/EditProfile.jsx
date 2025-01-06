import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../api/api";

function EditProfile({ closeEditModal, isEditModalOpen }) {
    const { isLoggedIn, user, getUserById } = useContext(AuthContext);
    const [username, setUsername] = useState(user?.username);
    const [collegeName, setCollegeName] = useState(user?.collegeName || "");
    const [thaparEmail, setThaparEmail] = useState(user?.thaparEmail);
    const [email, setEmail] = useState(user?.email);
    // const [password, setPassword] = useState(user?.password);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [rollNo, setRollNo] = useState(user?.rollNo);
    const [year, setYear] = useState(user?.year);  // State for year selection
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn])

    const handleUpdate = async (e) => {
        e.preventDefault();
        // Call register function from context
        const result = await api.patch(`/users/${user.id}`, { username, collegeName, thaparEmail, email, phoneNumber, rollNo, year });
        // console.log(result);

        // Handle response
        if (result) {
            toast.success("Profile Updated successful!");
            getUserById(user.id);
            navigate("/profile");
            closeEditModal();
        } else {
            toast.error(result.message);
        }
    };

    if (!isEditModalOpen) return null;

    return (
        <div className="min-h-screen mx-auto rounded-xl absolute top-0 w-full text-white py-6 content-center px-4 sm:px-6 lg:px-8 z-50">
            <div className="max-w-4xl mx-auto relative bg-[#0d1d41] rounded-3xl p-8  shadow-lg">
                <div className="flex items-center justify-between">
                    <button
                        onClick={closeEditModal}
                        className="absolute top-2 right-2 text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                    >
                        X
                    </button>
                    <h1 className="text-3xl font-extrabold text-center justify-center  mb-6">Update Your Profile</h1>
                </div>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Username */}
                        <div>
                            <label htmlFor="Name" className="block text-lg font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full p-3 bg-gray-700 text-white rounded-md"
                                placeholder="Enter Your name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        {/* College Name */}
                        <div>
                            <label htmlFor="collegeName" className="block text-lg font-semibold mb-2">College Name</label>
                            <input
                                type="text"
                                id="collegeName"
                                className="w-full p-3 bg-gray-700 text-white rounded-md"
                                placeholder="Thapar University"
                                value={collegeName}
                                onChange={(e) => setCollegeName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Thapar Email */}
                        {/* <div>
                            <label htmlFor="thaparEmail" className="block text-lg font-semibold mb-2">Thapar Email</label>
                            <input
                                type="email"
                                id="thaparEmail"
                                className="w-full p-3 bg-gray-700 text-white rounded-md"
                                placeholder="john1@thapar.edu"
                                value={thaparEmail}
                                onChange={(e) => setThaparEmail(e.target.value)}
                                required
                            />
                        </div> */}

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-3 bg-gray-700 text-white rounded-md"
                                placeholder="mail1@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phoneNumber" className="block text-lg font-semibold mb-2">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                className="w-full p-3 bg-gray-700 text-white rounded-md"
                                placeholder="123256780"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">


                        {/* Roll Number */}
                        <div>
                            <label htmlFor="rollNo" className="block text-lg font-semibold mb-2">Roll Number</label>
                            <input
                                type="text"
                                id="rollNo"
                                className="w-full p-3 bg-gray-700 text-white rounded-md"
                                placeholder="102"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                                required
                            />
                        </div>
                        {/* Year Dropdown */}
                    <div>
                        <label htmlFor="year" className="block text-lg font-semibold mb-2">Year</label>
                        <select
                            id="year"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>
                    </div>


                    {/* Password */}
                    {/* <div>
                        <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div> */}

                    <button
                        type="submit"
                        className="w-full mt-4 py-3 bg-blue-800 text-white font-semibold hover:bg-blue-900 rounded-xl"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
