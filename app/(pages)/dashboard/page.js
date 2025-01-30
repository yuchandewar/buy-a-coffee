"use client"
import React from 'react'
import Button from '@/app/component/button'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
// import datasaver from '@/app/utils/datasaver'
import mongoose from 'mongoose';
import {saveuserdata} from '@/_action/postuser'
import {getuserdata} from '@/_action/getuserdata'




const dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter();
  React.useEffect( () =>  {
    if (!session) {
      router.push('/');
    }
    else{
      getdata();
    }
  }, [session, router]);
  
  console.log(session)

 const getdata  = ()=>{
  let email = session.user.email
  
  getuserdata(email).then(async(res)  => {
   const data = await JSON.parse(res);
   setuserdata(data)
    console.log(data)
    })
 }

const [userdata, setuserdata] = React.useState({
  email: session?.user?.email || "",
  name: session?.user?.name || "",
  username: "",
  profilepic: session?.user?.image || "",
  coverpic: "",
  razorpayid: "",
  razorpaysecret: ""
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setuserdata((prevData) => ({
    ...prevData,
    [name]: value
  }));
};

return (
  <div className="container mx-auto p-4 bg-gray-900 md:w-1/2 w-full mt-12 text-white">
    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
    {/* details about user */}
    <p className="text-lg mb-2">Username: {session?.user?.name}</p>
    <p className="text-lg mb-4">Email: {session?.user?.email}</p>
    <form className="space-y-4">
    <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username:</label>
        <input type="text" id="username" name="username" value={userdata.username} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name:</label>
        <input type="text" id="name" name="name" value={userdata.name} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email:</label>
        <input type="email" id="email" name="email" value={userdata.email} disabled={true} className="mt-1 block w-full p-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="profilepic" className="block text-sm font-medium text-gray-300">Profile Photo URL:</label>
        <input type="url" id="profilepic" name="profilepic" value={userdata.profilepic} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="coverpic" className="block text-sm font-medium text-gray-300">Cover Photo URL:</label>
        <input type="url" id="coverpic" name="coverpic" value={userdata.coverpic} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="razorpayid" className="block text-sm font-medium text-gray-300">Key_Id:</label>
        <input type="text" id="razorpayid" name="razorpayid" value={userdata.razorpayid} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="razorpaysecret" className="block text-sm font-medium text-gray-300">Key_Secret:</label>
        <input type="text" id="razorpaysecret" name="razorpaysecret" value={userdata.razorpaysecret} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div className='flex justify-center items-center'>
        <button onClick={(e) => { e.preventDefault(); saveuserdata(userdata); }} type="submit" className="w-1/4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Submit
        </button>
      </div>
    </form>
  </div>
);
}

export default dashboard
  