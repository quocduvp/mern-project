import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt'
let schema = Schema

const UserSchema = new schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

UserSchema.methods.comparePassword = (passwpord) => {
    return bcrypt.compareSync(passwpord,this.password)
}

const UserModel = mongoose.model("Users",UserSchema)
export default UserModel