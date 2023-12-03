import express from 'express'
import bodyParser from 'body-parser'
import { User } from './user.js';
import bcrypt from 'bcrypt'
import { connectToDatabase } from './expressmongodb.js';
import cors from 'cors'
import { Wallet } from './wallet.js';


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



//const mongoUrl = 'mongodb://localhost:27017';

app.post('/register', async (req, res) => {
    const { username, password } = req.body;


    try {
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            return res.status(400).json({ error: "Bu kullanıcı adı kullanılamaz !" })
        }

        const newUser = new User({
            username,
            password
        });
        await newUser.save();

        res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi" })
    } catch (error) {
        console.error('Kayıt hatası:', error.message);
        res.status(500).json({ error: 'Sunucu hatası' });
    }

})

app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username })
        console.log(existingUser)
        if (existingUser && existingUser.username === username && existingUser.password === password) {
            res.status(201).json({
                username: existingUser.username,
                password: existingUser.password,
            }
            )

        } else {
            res.status(400).json({ error: 'Kullanıcı kayıtsız' })
        }

    } catch (error) {
        console.error('Kayıt hatası:', error.message);
        res.status(500).json({ error: 'Sunucu hatası' });
    }

})


app.post('/savedata', async (req, res) => {
    const { id, data } = req.body;
    console.log(data)
    try {
        const existingUser = await User.findOne({ username: "kullanici123" })

        if (existingUser && data) {
            const newWallet = new Wallet({
                username: id,
                ...data
            })
            await newWallet.save();
        } else {
            res.status(400).json({message : "Hatalı Kullanıcı"})
        }
    } catch (error) {

    }
})



app.listen(port, () => {
    connectToDatabase();
    console.log('Sunucu calıstı')
})