import mongoose from 'mongoose'

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI)
    mongoose.connection.on('connected', () => console.log('MongoDB connected'))
    mongoose.connection.on('error', (error) =>
      console.error('MongoDB error : ', error),
    )
  } catch (error) {
    console.error(error)
  }
}
