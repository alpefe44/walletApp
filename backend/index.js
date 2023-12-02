import express from 'express'
import bodyParser from 'body-parser'
import { User } from './user.js';
import bcrypt from 'bcrypt'
import { connectToDatabase } from './expressmongodb.js';


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


const mongoUrl = 'mongodb://localhost:27017';

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)

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
        const user = await User.findOne({ username })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Kullanıcı veya şifre hatalı' })
        }

        res.json({ message: 'Giriş Başarılı' })
    } catch (error) {
        console.error('Giriş hatası:', error.message);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
})


app.listen(port, () => {
    connectToDatabase();
    console.log('Sunucu calıstı')
})