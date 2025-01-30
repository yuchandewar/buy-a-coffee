"use server"
import Usermodel from '@/app/models/user'
import connectDB from '@/app/db/connectDb'


export async function getuserdata(email) {
    try {
        await connectDB();
        const existingUser = await Usermodel.findOne({ email: email });
        if (existingUser) {
            console.log(existingUser)
            return   await JSON.stringify(existingUser);
        } else {
            console.log('User not found');
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}
