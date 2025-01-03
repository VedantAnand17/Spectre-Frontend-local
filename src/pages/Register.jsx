import React, { useContext, useEffect } from 'react'
import Card from '../components/Card'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const { isLoggedIn} = useContext(AuthContext); // Accessing user context
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/profile");
        }
    }, [isLoggedIn])
    return (
        <div className="bg-[#1E4751] min-h-screen flex justify-center items-center">
            <Card />
        </div>
    )
}
