import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  title: String,
  content:String
})

const User = mongoose.model('user', UserSchema)
export default User
