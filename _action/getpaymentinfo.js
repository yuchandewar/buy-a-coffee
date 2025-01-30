"use server"
import payment from '@/app/models/payment'
import connectDB from '@/app/db/connectDb'


export async function getpaymentinfo(email) {
    try {
        await connectDB();
        const existingUser = await payment.findOne({ email: email });
        if (existingUser) {
            console.log(existingUser)
            return   await JSON.stringify(existingUser);
        } else {
            console.log('Payment not found');
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}
