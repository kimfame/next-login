import bcrypt from 'bcrypt'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import { connect } from '@/utils/dbConfig'

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 400 },
      )
    }

    if (!password?.length || password.length < 5) {
      return NextResponse.json(
        { message: 'password must be at least 5 characters' },
        { status: 400 },
      )
    }

    await connect()
    const userExists = await User.findOne({ email }).lean().exec()

    if (userExists) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 },
      )
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    await User.create({
      name,
      email,
      password: hashedPassword,
    })
    return NextResponse.json({ message: 'User Created.' }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Account creation failed' },
      { status: 500 },
    )
  }
}
