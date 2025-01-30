"use server"
import Usermodel from '@/app/models/user'
import connectDB from '@/app/db/connectDb'

export async function saveuserdata(userdata) {



    try {
        await connectDB();
        const existingUser = await Usermodel.findOne({ email: userdata.email });
        if (existingUser) {
            existingUser.name = userdata.name;
            existingUser.username = userdata.username.replaceAll(" ", "");
            existingUser.profilepic = userdata.profilepic;
            existingUser.coverpic = userdata.coverpic;
            existingUser.razorpayid = userdata.razorpayid;
            existingUser.razorpaysecret = userdata.razorpaysecret;
            await existingUser.save();
            console.log('User details updated');
        } 
    } catch (error) {
        console.error(error);
    }

    }
    
