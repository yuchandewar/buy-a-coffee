
"use client";

import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import React from "react";
import  Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { getuserdata } from "@/_action/getuserdata";

export function Component() {
  const { data: session } = useSession();
  const [userdata, setuserdata] = React.useState({});
  
  // let profileaddress="";
  React.useEffect(() => {
    
   let email = session.user.email
   
    getuserdata(email).then(async(res)  => {
    const  data = await JSON.parse(res);
    setuserdata(data);
      
      })
   
  }, [])
  
    
 const profileaddress = `/${userdata.username}`
    
  return (
    <Dropdown label="" className= " z-50 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 ">
      <Dropdown.Header>
        <span className="block text-smtext-white text-white ">{session.user.name}</span>
        <span className="block text-white truncate text-sm font-medium">{session.user.email}</span>
      </Dropdown.Header>
      <Link href="/dashboard">
        <Dropdown.Item icon={HiViewGrid} className="hover:font-semibold text-white">Dashboard</Dropdown.Item>
      </Link>
      
      <Dropdown.Item icon={HiCog}  className="hover:font-semibold text-white" >Settings</Dropdown.Item>

      <Link href={profileaddress}>
      <Dropdown.Item icon={HiCurrencyDollar}   className="hover:font-semibold text-white" >My profile</Dropdown.Item>
      </Link>
      


      <Dropdown.Divider />
      <Dropdown.Item icon={HiLogout}  className="hover:font-semibold text-white" >Sign out</Dropdown.Item>
    </Dropdown>
  );  
}

export default Component;