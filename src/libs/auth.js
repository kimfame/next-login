import bcrypt from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import User from '@/models/User'
import { connect } from '@/utils/dbConfig'

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
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

        await connect()
        const user = await User.findOne({ email })
        const passwordOk = user && bcrypt.compareSync(password, user.password)

        if (passwordOk) {
          return user
        }

        return null
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const newSession = session
      const sessionUser = await User.findOne({ email: session.user.email })

      newSession.user.id = sessionUser._id
      return newSession
    },
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        if (!profile.email_verified) {
          return false
        }

        try {
          await connect()
          const userExists = await User.findOne({ email: profile.email })

          if (!userExists) {
            await User.create({
              email: profile.email,
              name: profile.name,
            })
          }
          return true
        } catch (error) {
          console.log(error)
        }
      } else if (account.provider === 'credentials') {
        return true
      }

      return false
    },
  },
}
