import React from 'react'
import { HiOutlineBell } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Popover } from '@headlessui/react';

export default function Header() {
  return (
    <div className='bg-white h-16 px-4 flex justify-between items-center px-10'>
        <div className='text-lg'>Welcome User!</div>
        <div className='flex items-center gap-8'>
        <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className=" p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100" >
           <HiOutlineUserCircle fontSize={24} />
            </Popover.Button>
            </>
        )}
            </Popover>
            <HiOutlineBell fontSize={24}/>
        </div>
    </div>
  )
}
