import React from 'react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function Card() {
    return (
        <div className='h-[80vh] bg- m-auto w-[80vw] rounded-l-3xl bg-black'>

            <div className='h-[80vh] content-center w-[80vw] rounded-l-3xl z-50 container m-auto grid grid-cols-2 text-8xl text-white absolute'>
                <div className="flex flex-col justify-center items-center">
                    <div className="backdrop-blur-sm rounded-2xl">
                        <div className="text-8xl font-bold mb-4">Spectre</div>
                        <div className="text-xl max-w-md mb-8">Welcome to the virtual arena of Spectre CTF—a world where the lines between reality and imagination blur, and your skills are your most powerful weapon.</div>
                        <div className="flex gap-2">

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" /></svg>
                        </div>
                    </div>
                </div>
                <div className=" h-[80vh] flex flex-col items-center justify-center gap-10 bg-opacity-80 ">
                    <div className="">
                        <div className="text-4xl font-bold">Create new account</div>
                        <div className="flex">
                            <span className="text-sm">Already have an account? </span>
                            <a href="" className='text-sm ml-1 text-blue-600 underline font-semibold'>Sign in</a>
                        </div>
                    </div>
                    <form className=' w-80 gap-6 flex flex-col font-semibold' action="">
                        {/* <input type="text" /> */}
                        <Input type='text' id="name" placeholder="Name" className='rounded-xl py-6'></Input>
                        <Input type='number' id="phone" placeholder="Phone Number" className='rounded-xl py-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'></Input>
                        <Input type='email' id="email" placeholder="Email" className='rounded-xl py-6'></Input>
                        <Input type='password' id="password" placeholder="Password" className='rounded-xl py-6'></Input>

                        <Button className='rounded-xl py-6 bg-blue-500'>Sign up</Button>
                    </form>
                </div>
            </div>

            <img src="https://media.discordapp.net/attachments/1314526467144814635/1324340684366282792/1000145998.jpg?ex=6777cbe0&is=67767a60&hm=fdfcaf7ecb49d2211ddcff58e32a8b9f5bba997de82025a2eaa20fc0b1ccf326&=&format=webp&width=735&height=735" alt="" className='object-fill w-[80vw] h-[80vh] rounded-l-3xl absolute z-0' />
            <img src="https://cdn.discordapp.com/attachments/1314526467144814635/1324343797273985034/WhatsApp_Image_2024-12-16_at_19.56.38_b381d835-removebg-preview_5.png?ex=6777cec6&is=67767d46&hm=f30fa15fe7f027bcc9a4c30ea8553b0978ebaf1d15cca5ae1b8b5aaf0286707a&" alt="" className='absolute ml-[1.5rem] z-0' />
            <div className="ml-[30vw] h-[80vh] w-[50vw] overflow-clip contain-content">
                <div className="bg-[#072836] bg-opacity-80 w-[100vw] h-[200vh] -mt-24 absolute overflow-clip rotate-12"></div>
            </div>
        </div>
    )
}
