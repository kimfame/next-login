import {User} from "@/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGODB_URI);
  
  const password = body.password;
  if (!password?.length || password.length < 5) {
    new Error('password must be at least 5 characters');
  }

  const notHashedPassword = password;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const newUser = await User.create(body);
  return Response.json(newUser);
}