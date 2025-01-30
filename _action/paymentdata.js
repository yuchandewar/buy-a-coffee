"use server"
import payment from '@/app/models/payment'
import connectDB from '@/app/db/connectDb'
import Usermodel from '@/app/models/user'

export async function paymentdata(amount, email , usermessage, userdataname,response) {
   
    try {
        await connectDB();
        const existingUser = await Usermodel.findOne({ email:email });
        if (existingUser) {
           let existpaymentuser = await payment.findOne({ email: email});
            if(existpaymentuser){
                existpaymentuser.payments.push({
                    name: userdataname,
                    to_user: email,
                    oid: response.razorpay_payment_id,
                    message: usermessage,
                    amount: (amount/100),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    done: true
                });
                await existpaymentuser.save();
            }
            else{
                const newPayment = new payment({
                    email: email,
                    payments: [{
                        name: userdataname,
                        to_user: email,
                        oid: response.razorpay_payment_id,
                        message: usermessage,
                        amount: (amount/100),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        done: true
                    }]
                });
                await newPayment.save();
            }
            
            } 
            
    } catch (error) {
        console.error(error);
    }
}


// name: userdata.paymentDetails.name,
//                 to_user: userdata.paymentDetails.to_user,
//                 oid: userdata.paymentDetails.oid,
//                 message: userdata.paymentDetails.message,
//                 amount: userdata.paymentDetails.amount,
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//                 done: userdata.paymentDetails.done || false