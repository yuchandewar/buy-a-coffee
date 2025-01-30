import React from 'react'
import Link from 'next/link' 
import Button from '../button'
import Logbutton from '../logbutton'
const Navbar = () => {
  return (
    <div>
        <div className='flex justify-between items-center h-16 bg-gray-800 text-white'>
            <div className='flex items-center space-x-2 pl-8 justify-center'>
                <img src="./tea.gif" width={44} alt="" />
                <span>Buy me a coffee</span>
            </div>
            <div className='flex space-x-4 mr-8 items-center'>
            <Link href="./home">Home</Link>
            
            <Link href='/auth'></Link>
            <Logbutton></Logbutton>
            
           
            </div>
            
        </div>
       
    </div>
  ) 
}

export default Navbar
