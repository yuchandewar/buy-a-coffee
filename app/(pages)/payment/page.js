"use client";

import React, { useState } from 'react';
import usePayment from '@/app/utils/usePayment';
import { paymentdata } from '@/_action/paymentdata';

export default function PaymentPage() {
  const [amount, setAmount] = useState(1000); // Amount in paise
  const { handlePayment } = usePayment();

  return (
    <div>
      <h1>Razorpay Payment Integration</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount in paise"
        className="border p-2 rounded-md"
      />
      <button
        onClick={() => handlePayment(amount)}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2"
      >
        Pay Now
      </button>

      <button onClick={()=>paymentdata("rtaram551@gmail.com")}>
        Add data
      </button>
    </div>
  );
}
