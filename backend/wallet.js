import mongoose from 'mongoose'


var Schema = mongoose.Schema;


var walletSchema = new Schema({
    username: String,
    name: String,
    price: Number,
    image: String
})

const Wallet = mongoose.model('Wallet', walletSchema);

export { Wallet }