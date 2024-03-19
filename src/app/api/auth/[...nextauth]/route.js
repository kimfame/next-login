import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import User from '@/models/User'

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'test@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email
        const password = credentials?.password

        mongoose.connect(process.env.MONGODB_URI)
        const user = await User.findOne({ email })
        const passwordOk = user && bcrypt.compareSync(password, user.password)

        if (passwordOk) {
          return user
        }

        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
