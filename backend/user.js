import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

var Schema = mongoose.Schema;


var userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
})

// Şifre hashleme işlemi için ön kayıt işlemi
userSchema.pre('save', async function (next) {
    const user = this;

    // Şifre değişmemişse veya yeni bir kullanıcı ekleniyorsa işlemi geç
    if (!user.isModified('password')) return next();

    // Şifreyi hashleme
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    next();
});

const User = mongoose.model('User', userSchema);

export { User }