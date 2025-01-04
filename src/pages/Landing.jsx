import React, { useContext } from 'react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export default function Landing() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className='w-screen'>
            <img src="https://cdn.discordapp.com/attachments/1314526467144814635/1324651820072829019/Desktop_-_40.png?ex=6778eda4&is=67779c24&hm=7ad13f000d4ec217b872b32701a51f68ceb3c4c7ddda148fff71a3063dc230d6&" className='h-screen w-screen absolute object-cover' alt="" />
            <div className="h-screen w-screen absolute flex max-lg:justify-center">
                <img src="https://cdn.discordapp.com/attachments/1314526467144814635/1324343797273985034/WhatsApp_Image_2024-12-16_at_19.56.38_b381d835-removebg-preview_5.png?ex=67787786&is=67772606&hm=fcfcc4128798458f59642d22bbeab7c250315ed4a1813f89f3bdacfb6cd71d31&" className='absolute ml-6 flex justify-center  ' alt="" />
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
