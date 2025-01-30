"use client";

import { useRazorpay } from 'react-razorpay';
import { useRouter } from 'next/navigation';
import {paymentdata} from "@/_action/paymentdata"

export default function usePayment(razorpayid) {
  const razorpay = useRazorpay({
    keyId: razorpayid,  // Replace with your actual key ID
  });
  const router = useRouter();

  const handlePayment = async (amount, email , usermessage, userdataname, razorpayid) => {
    const options = {
      key: razorpayid, // Replace with your actual key ID
      amount: amount, // Amount in paise
      currency: 'INR',
      name: 'BUY Me a coffee',
      description: 'Payment for [Product/Service Name]',
      image: 'https://your-logo-url.com',
      handler: function (response) {
        console.log(response);
        paymentdata(amount, email , usermessage, userdataname,response)
        console.log("It is okk", amount, email , usermessage, userdataname)
        
        // router.push('/success'); // Redirect to success page
      },
      prefill: {
        name: userdataname,
        email: email,
        contact: '',
      },
      theme: {
        color: '#3399cc',
      },
    };

    try {
      const instance = new razorpay.Razorpay(options);
      instance.open();
      

    } catch (error) {
      console.error("Payment failed:", error);
      router.push('/error'); // Redirect to error page
    }
  };

  return { handlePayment };
}
