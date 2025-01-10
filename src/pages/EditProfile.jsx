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
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [rollNo, setRollNo] = useState(user?.rollNo);
    const [year, setYear] = useState(user?.year);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn])

    const handleUpdate = async (e) => {
        e.preventDefault();
        const result = await api.patch(`/users/${user.id}`, { username, collegeName, thaparEmail, email, phoneNumber, rollNo, year });

        if (result) {
            toast.success("Profile Updated successful!");
            closeEditModal();
            getUserById(user.id);
            navigate("/profile");
        } else {
            toast.error(result.message);
        }
    };

    if (!isEditModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto z-50">
            <div className="bg-gray-800 rounded-3xl p-6 w-full max-w-2xl relative">
                <button
                    onClick={closeEditModal}
                    className="absolute top-4 right-4 text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
                >
                    X
                </button>

                <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">Update Your Profile</h1>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label htmlFor="Name" className="block text-sm md:text-base font-semibold mb-2 text-white">Name</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg"
                                placeholder="Enter Your name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        {/* College Name */}
                        <div>
                            <label htmlFor="collegeName" className="block text-sm md:text-base font-semibold mb-2 text-white">College Name</label>
                            <input
                                type="text"
                                id="collegeName"
                                className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg"
                                placeholder="Thapar University"
                                value={collegeName}
                                onChange={(e) => setCollegeName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm md:text-base font-semibold mb-2 text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg"
                                placeholder="mail1@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm md:text-base font-semibold mb-2 text-white">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg"
                                placeholder="123256780"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        {/* Roll Number */}
                        <div>
                            <label htmlFor="rollNo" className="block text-sm md:text-base font-semibold mb-2 text-white">Roll Number</label>
                            <input
                                type="text"
                                id="rollNo"
                                className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg"
                                placeholder="102"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                                required
                            />
                        </div>

                        {/* Year Dropdown */}
                        <div>
                            <label htmlFor="year" className="block text-sm md:text-base font-semibold mb-2 text-white">Year</label>
                            <select
                                id="year"
                                className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg"
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

                    <button
                        type="submit"
                        className="w-full mt-6 py-2 md:py-3 bg-blue-700 text-white font-semibold hover:bg-blue-800 rounded-xl transition-colors"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;