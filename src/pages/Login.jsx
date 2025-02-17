import React, { useState, useContext, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import HyperText from "../components/ui/hyper-text";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, login, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/profile");
        }
    }, [isLoggedIn])

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.email == "" || formData.email == null) {
            toast.error("Provide the Email");
            return;
        }
        if (formData.password == "" || formData.password == null) {
            toast.error("Provide the Password");
            return;
        }
        setLoading(true);
        // console.log(formData);
        const response = await login(formData);

        if (response.success) {
            toast.success(response.message);
            navigate("/profile")
            // console.log(response);
        } else {
            toast.error(response.message);
        }

        setLoading(false);
    };

    return (
        <div className="bg-[#1E4751] min-h-screen flex justify-center items-center">
            <div className="h-[100vh] w-screen m-auto rounded-3xl">
                {/* <div className="h-[90vh] content-center w-[90vw] rounded-3xl z-50 container m-auto flex justify-around max-md:flex-col text-8xl text-white absolute">
                    <div className="flex flex-col justify-center items-center">
                            <div className="text-8xl font-bold md:mb-16 underline backdrop-blur-sm rounded-xl max-md:text-6xl max-md:mt-28">Spectre</div>
                            <div className="flex gap-4 max-md:hidden">

                                <Link to="" target="_blank" className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                                </Link>
                                <Link to="" target="_blank" className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
                                </Link>
                                <Link to="" target="_blank" className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" /></svg>
                                </Link>
                            </div>
                        </div>
                    </div> */}

                <img
                    src="https://res.cloudinary.com/di3ap5nsr/image/upload/v1736535914/Group_84_1_2_dofjkv.png"
                    alt=""
                    className="object-cover w-screen h-screen absolute z-0"
                />
                <img src="https://res.cloudinary.com/di3ap5nsr/image/upload/v1736530975/WhatsApp_Image_2024-12-16_at_19_vg5grl.png" alt="" className="absolute ml-6 max-md:h-14" />

                <div className="h-[90vh] w-screen text-white flex flex-col items-center absolute rounded-3xl justify-center gap-5 bg-opacity-80">
                <div className="flex backdrop-blur-sm py-2 flex-col items-center rounded-3xl justify-center gap-10 bg-opacity-80  max-md:opacity-80 max-md:p-5 max-sm:p-2 ">
                    <div className="flex flex-col justify-center items-center">
                            <div className="text-4xl font-bold mb-1">Login</div>
                            <div className="flex">
                                <span className="text-sm">Don't have an account? </span>
                                <Link to="/register" className="text-sm ml-1 text-blue-600 underline font-semibold hover:text-blue-800">Register</Link>
                            </div>
                        </div>
                        <form className="w-80 gap-6 flex flex-col font-semibold" onSubmit={handleSubmit}>
                            {/* <Input type="text" id="username" placeholder="Username" value={formData.username} onChange={handleChange} className="rounded-xl py-6" /> */}
                            {/* <Input
                                type="number"
                                id="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="rounded-xl py-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            /> */}
                            <Input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} className="rounded-xl py-6" />
                            {/* <Input type="email" id="thaparEmail" placeholder="Thapar Email" value={formData.thaparEmail} onChange={handleChange} className="rounded-xl py-6" /> */}
                            {/* <Input type="number" id="rollNo" placeholder="Roll Number" value={formData.rollNo} onChange={handleChange} className="rounded-xl py-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /> */}
                            <Input type="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} className="rounded-xl py-6" />
                            <Button type="submit" disabled={loading} className="rounded-xl py-6 bg-blue-700 hover:bg-blue-800">
                                {loading ? "Logging In..." : "Login"}
                            </Button>
                        </form>
                    </div>
                </div>
                {/* <div className="flex gap-4 bottom-0 justify-center md:hidden max-md:pb-2">

                        <Link to="" target="_blank" className="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                        </Link>

                        <Link to="" target="_blank" className="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
                        </Link>

                        <Link to="" target="_blank" className="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" /></svg>
                        </Link>

                    </div> */}
            </div>
            {/* <img
                    src="https://github.com/VedantAnand17/voidImages/blob/main/specAuth.png?raw=true"
                    alt=""
                    className="object-fill w-[90vw] h-[90vh] rounded-l-3xl absolute z-0"
                /> */}
            {/* <img src="https://res.cloudinary.com/di3ap5nsr/image/upload/v1736530975/WhatsApp_Image_2024-12-16_at_19_vg5grl.png" alt="" className="absolute ml-6 max-md:h-14" /> */}
            {/* <div className="ml-[33vw] h-[90vh] w-[57vw] overflow-clip contain-content absolute max-md:hidden">
                    <div className="bg-[#072836] bg-opacity-80 w-[150vw] h-[200vh] mt-10 absolute overflow-clip rotate-12 z-10"></div>
                </div> */}
        </div>
        // </div>
    );
}