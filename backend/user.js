import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

var Schema = mongoose.Schema;


var userSchema = new Schema({
    username: String,
    password: String
})

const User = mongoose.model('User', userSchema);

export { User }