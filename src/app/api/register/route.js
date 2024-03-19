import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export default async function POST(req) {
  const body = await req.json()
  mongoose.connect(process.env.MONGODB_URI)

  const { password } = body
  if (!password?.length || password.length < 5) {
    return NextResponse.json(
      { message: 'password must be at least 5 characters' },
      { status: 400 },
    )
  }

  const notHashedPassword = password
  const salt = bcrypt.genSaltSync(10)
  body.password = bcrypt.hashSync(notHashedPassword, salt)

  const newUser = await User.create(body)
  return NextResponse.json(newUser)
}
