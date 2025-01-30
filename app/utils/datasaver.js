// "use client"
import mongoose from "mongoose";

// const url = process.env.MONGO_URI;
const url ="mongodb+srv://yuchandewar:GBXDMnfHnRhTfuuP@cluster0.ut37e.mongodb.net/payment"

if (!url) {
  throw new Error('MONGO_URI environment variable is not defined');
}


const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String},
  username: { type: String, required: true },
  profilepic: {type: String},
  coverpic: {type: String},
  razorpayid: { type: String },
  razorpaysecret: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  });

  const User =mongoose.model('User', userSchema);

async function connectDB() {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error('Connection error:', err));


}

async function  datasaver()  {

    // await connectDB();

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected')).catch(err => console.error('Connection error:', err));
    
    
        // Create a new user
         try {
           const user = await User.create({
             email: "yuxhandewar@gmail.com", 
             username: "hello", 
           });
           console.log('User saved:', user);
         } catch (error) {
           console.error('Error saving user:', error);
         }
        
                 
 
}

export default datasaver
