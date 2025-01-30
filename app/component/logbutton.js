"use client"
import React from 'react'
import Button from '@/app/component/button'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import Dropdown from './dropdown'

const Login = () => {
    const { data: session } = useSession()
    console.log(session)
    const router = useRouter();
    if(session) {
      
      return <>

      {/* {session.user.name} */}
        <div className='flex items-center justify-center gap-2' >
        

        <div  onClick={() => signOut()}>
          <Button title="Sign out" >  </Button>
          </div>

          <Dropdown></Dropdown>

        </div>

      
      

      

        {/* Signed in as {session.user.email} <br/>
        <button onClick={() => signOut()}>Sign out</button> */}
      </>
    }

    
    return <>
      {/* Not signed in <br/> */}
      
      

      <div  onClick={() => signIn("github")}>
      <Button title="Git-Hub" >  </Button>
      </div>
      


      {/* <button onClick>Sign in using Github</button>
      <button onClick={() => signIn("google")}>Sign in using Google</button>  */}
    </>
}
export default Login
