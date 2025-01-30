"use client"
import React, { useState, useEffect, } from 'react';
import Button from '@/app/component/button'
import usePayment from '@/app/utils/usePayment';
import { getinfodata } from '@/_action/getinfo';
import { useRouter } from 'next/navigation';
import {getpaymentinfo} from '@/_action/getpaymentinfo';

const userinterface =  ({params}) =>{
  
  const [userdataname, setuserdataname] = React.useState("");
  const [userdata, setuserdata] = React.useState();
  const [usermessage, setusermessage] = React.useState("");
  const { username } = React.use(params);
  const [amount, setAmount] = useState(undefined); // Amount in paise
  
  const router = useRouter();
  const [paymentdata, setpaymentdata] = useState({});
  const [razorpayid, setrazorpayid] = useState("");
  const { handlePayment } = usePayment(razorpayid);


  useEffect(() => {
    getinfodata(username).then(async (res) => {
      const data = await JSON.parse(res);
      if (!data) {
        
        router.push('/');
      } else {
        setuserdata(data);
        setrazorpayid(data.razorpayid);
        console.log(data);

        getpaymentinfo(data.email).then(async(res)=>{
          const data1 = await JSON.parse(res);
          if (data1) {
            setpaymentdata(data1);
          } else {
            setpaymentdata({});
          }
          console.log(data1);
        })

      }
    });

    

  }, [username, router]);
  


  return (
    <div>
    <div className='relative flex flex-col items-center bg-slate-800'>
      <div className=' w-full h-[35vh] bg-slate-600'>
        <img  className='object-fit h-full w-full'  src={userdata?.coverpic} 
        alt="Logo" />
      </div>
      <div className='w-24 h-24 absolute -bottom-14 '>
        <img  className='absolute w-24 h-24 rounded-lg border border-red-50'  src={userdata?.profilepic} 
        alt="Logo" />
      </div>
     </div>

    {/* details about profile */}
    <div className='flex flex-col items-center mt-16 '>  
      <div className=' 
      p-4 rounded-lg'> 
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-3xl text-white font-bold'>{username}</h1>
          <p className='text-lg text-white'>
          Adding teams/competitions for FC25/FIFA {userdata?.email || ""} </p>
        <div className='text-slate-400'> 
        {paymentdata.payments ? paymentdata.payments.length : 0} Payments
        </div>
       </div>
      </div>
    </div>

    <div  className='md:flex  min-h-8  gap-3 m-3 '>
      <div className='bg-gray-900 w-full m-2 rounded-lg '>
          <div className='p-4 text-2xl font-bold'>
            Top 10 Supporter
          </div>
          {/* profile card of supporter */}
          <div className='p-1 mx-3 flex flex-col gap-2 '>

        {paymentdata?.payments && paymentdata.payments.length > 0 ? (
          paymentdata.payments.map((payment, index) => (
            <div key={index}>
              <div className='flex items-center justify-start'>
                <img className='w-8 h-8 rounded-full' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/13005148/4a7fac1b385f474a98dac01b3454d3ef/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/7.png?token-time=1738627200&token-hash=EG1V5ZY5A2MR3FgfrlvgT981An_LDaqpAAKFp1n2IyY%3D" 
                alt="" />
                <span className='ml-3'>
                  {payment.name} is donating <span className='font-bold'>{payment.amount}</span> with the message "{payment.message}"
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-white'>No payments have been made yet.</div>
        )}
            
         




          </div>
          
      </div>
      <div className='bg-gray-900 w-full rounded-lg m-2'>

      {/* information of form */}
      <div className='p-4 text-2xl font-bold'>
        Make a payment
        </div>
        <div className='p-4'>
          <form action={() => handlePayment(amount* 100, userdata.email, usermessage, userdataname, razorpayid)} className='flex flex-col gap-3'>
            <div className='flex flex-col gap-3'>
             
              <input required value={userdataname} onChange={(e)=>{e.preventDefault(); setuserdataname(e.target.value)}} type="text" className='p-2 bg-transparent rounded-lg border border-white'
              placeholder="Enter your name"/>
              </div>
              {/* <div className='flex flex-col gap-3'>
                
                <input type="email" className='p-2  bg-transparent rounded-lg border border-white'
                placeholder="Enter your email"/>
                </div> */}

                <div className='flex flex-col gap-2'>
                    
                    <input required type="number" value={amount}
                     onChange={(e) => setAmount(e.target.value)}
                     className='p-2 rounded-lg border bg-transparent border-white'
                    placeholder="Enter your amount"/>
                  {/* choose from given amount 20 30 50 buttons */}
                  <div className='flex gap-2 items-end justify-end mr-3'>
                    <button onClick={(e) => { e.preventDefault(); setAmount(20); }} className='bg-gray-700 border text-white p-2 rounded-lg'>20</button>
                    <button onClick={(e) => { e.preventDefault(); setAmount(30); }} className='bg-gray-700 border text-white p-2 rounded-lg'>30</button>
                    <button onClick={(e) => { e.preventDefault(); setAmount(50); }} className='bg-gray-700 border text-white p-2 rounded-lg'>50</button>
                    
                  </div>
                  
                 

                    </div>

                <div className='flex flex-col gap-3'>
                  
                  <textarea required value={usermessage} onChange={(e)=>{e.preventDefault(); setusermessage(e.target.value)}} className='p-2 rounded-lg border  bg-transparent rounded-lg border border-white'
                  placeholder="Enter your message"/>
                  </div>
                 
                    <div className='flex flex-col gap-2 items-center '>
                    <button  type="sunmit" className= "w-1/4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Pay</button>
                    {/* <button onClick={() => handlePayment(amount* 100, userdata.email, usermessage, userdataname, razorpayid)} type="button" className= "w-1/4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                     Pay</button> */}
                    </div>
                    
            
          </form>
      </div>


      </div>
    </div>

    </div>
  )
}

export default userinterface
