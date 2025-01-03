import React from 'react'
import {Button} from '../components/ui/button'

export default function Landing() {
  return (
    <div className='w-screen'>
        <img src="https://cdn.discordapp.com/attachments/1314526467144814635/1324651820072829019/Desktop_-_40.png?ex=6778eda4&is=67779c24&hm=7ad13f000d4ec217b872b32701a51f68ceb3c4c7ddda148fff71a3063dc230d6&" className='h-screen w-screen absolute object-cover' alt="" />
        <div className="h-screen w-screen absolute flex max-lg:justify-center">
        <img src="https://cdn.discordapp.com/attachments/1314526467144814635/1324343797273985034/WhatsApp_Image_2024-12-16_at_19.56.38_b381d835-removebg-preview_5.png?ex=67787786&is=67772606&hm=fcfcc4128798458f59642d22bbeab7c250315ed4a1813f89f3bdacfb6cd71d31&" className='absolute ml-6 flex justify-center  ' alt="" />
        </div>
        <div className="h-screen w-screen absolute text-white">
            <div className="flex lg:gap-60 lg:justify-around items-center h-screen text-xl max-lg:flex-col max-lg:justify-end ">
                <div className="max-lg:flex-col gap-60 justify-around lg:w-screen flex ml-8 max-lg:gap-10 pb-4">
                <Button className="bg-[#4F4D4D] p-6 rounded-3xl uppercase hover:bg-[#333232] text-xl font-bold">Register</Button>
                <Button className="bg-[#4F4D4D] p-6 rounded-3xl uppercase hover:bg-[#333232] text-xl font-bold">Log In</Button>
                </div>
            </div>
        </div>
    </div>
  )
}
