import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: String,
    fullName:String ,
    age: Number,
    highestEducation: String,
    graduationCollege: String,
    stream: String,
    experience: String,
    admittedUniversityName: String,
    programName: String,
    yourCountryName: String,
    futureGoals: String,
    listeningScore:Number,
    readingScore: Number,
    speakingScore: Number,
    writingScore: Number,
    isTutionFeePaid: Boolean,
    feePaidValue: Number,
    isGic: Boolean,
    paidGicValue: Number,
})

const User = mongoose.model('user', UserSchema)
export default User
