

import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
// import connectDb from '@/app/db/connectDb';
// import User from '@/app/models/user';
import mongoose from "mongoose";

let url = process.env.MONGO_URI;


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

  const User = mongoose.models.user || mongoose.model('user', userSchema);

async function connectDB() {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error('Connection error:', err));


}


const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
       if(account.provider == "github") { 
        
        connectDB();

       
           // Check if the user already exists in the database
          const currentUser = await User.findOne({ email: user.email });  
            if(!currentUser){
            // Create a new user
            //  await User.create({
            //   email: user.email, 
            //   username: user.email.split("@")[0], 
            // })   

            const newUser = new User({
              email: user.email, 
              username: user.email.split("@")[0], 
            });
            newUser.save().then((status) => {  
              console.log('User saved:', status);
              // return true;
                // Redirect to the user's profile page after saving
                // res.redirect(`/user/${user.email.split("@")[0]}`);
              }).catch((error) => {  
              console.error('Error saving user:', error);
              });
            
          } 
          return true
         }
      },
    
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email: session.user.email})
      session.user.name = dbUser.username
      return session
    },
  } 

})

export {handler as GET, handler as POST}