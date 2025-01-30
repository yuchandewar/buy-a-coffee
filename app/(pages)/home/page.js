import React from 'react'
import Button from '@/app/component/button'
const Home = () => {
  return (
    <div className=''>
      <div className='flex h-[45vh] flex-col items-center  text-center items-center m-auto justify-center  ' >
      <div className='flex items-center justify-center' >
      <h1 className='text-white font-bold text-4xl py-3'>Buy me coffee</h1>
      <span><img src="./tea.gif" width={44} alt="" /></span>
      </div>
      <span>Lorem ipsum dolor sit amet dolor sit amet delectus.</span>
      <span>Lorem ipsum dolor dolor sit amet dolor sit amet delectus sit amet dolor sit amet  delectus.</span>
     <div className='flex items-center justify-center space-x-4 py-4' >
      <Button title="Start here"></Button>
      <Button title="Read More"></Button>
     </div>
      </div>
    <div className='border h-[1px] border-gray-500 w-full'></div>
    
    <div className='flex h-[40vh] flex-col items-center  text-center items-center m-auto   ' >
      <h2 className='py-2 font-bold text-lg mb-4'>Your Fans can buy you a coffee</h2>
     
    <div className='flex flex-col md:flex-row gap-7 items-center justify-around space-x-4 py-4' >


    <div className='flex flex-col items-center justify-center space-y-2' >
      
      <div className='bg-gray-600   w-fit rounded-full p-2 flex items-center justify-center space-x-2' >
      <img className='  ' width={88} src="./man.gif" alt="" />
      
      </div>
      <span>Fans Want to help</span>
<span>Lorem ipsum dolor sit amet consectetur.</span>


     </div>
     
     <div className='flex flex-col items-center justify-center space-y-2' >
      
      <div className='bg-gray-600   w-fit rounded-full p-2 flex items-center justify-center space-x-2' >
      <img className='  ' width={88} src="./coin.gif" alt="" />
      
      </div>
      <span>Fans Want to help</span>
<span>Lorem ipsum dolor sit amet consectetur.</span>


     </div>
     
     <div className='flex flex-col items-center justify-center space-y-2' >
      <div className='bg-gray-600   w-fit rounded-full p-2 flex items-center justify-center space-x-2' >
      <img className='  ' width={88} src="./group.gif" alt="" />
      
      </div>
      <span>Fans Want to help</span>
<span>Lorem ipsum dolor sit amet consectetur.</span>
 </div>

    </div>
    <div className='border h-[1px] border-gray-500 w-full'></div>
    
     
     </div>
 </div>
  )
}

export default Home
