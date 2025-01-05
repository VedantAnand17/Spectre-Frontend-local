import React, { useContext } from 'react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export default function Landing() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className='w-screen'>
            <img src="https://github.com/VedantAnand17/voidImages/blob/main/specLanding.png?raw=true" className='h-screen w-screen absolute object-cover' alt="" />
            <div className="h-screen w-screen absolute flex max-lg:justify-center">
                <img src="https://github.com/VedantAnand17/voidImages/blob/main/owaspLogo.png?raw=true" className='absolute ml-6 flex justify-center  ' alt="" />
            </div>
            <div className="h-screen w-screen absolute text-white">
                <div className="flex lg:gap-60 lg:justify-around items-center h-screen text-xl max-lg:flex-col max-lg:justify-end ">
                    <div className="max-lg:flex-col gap-60 justify-around lg:w-screen flex ml-8 max-lg:gap-10 pb-4 items-center">
                        {/* <Button className="bg-[#4F4D4D] p-6 rounded-3xl uppercase hover:bg-[#333232] text-xl font-bold">Register</Button> */}
                        {!isLoggedIn && <>
                            <Link to="/register">
                                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 font-bold py-1 text-lg text-white backdrop-blur-3xl uppercase">
                                        Register
                                    </span>
                                </button>
                            </Link>

                            <Link to="/login">
                                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 font-bold py-1 text-lg  text-white backdrop-blur-3xl uppercase">
                                        Log In
                                    </span>
                                </button>
                            </Link>
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
