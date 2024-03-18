import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import {User} from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({email});
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        
        if (passwordOk) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }