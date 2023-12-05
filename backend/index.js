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
    console.log(username, password)


    try {
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            return res.status(400).json({ error: "Bu kullanıcı adı kullanılamaz !" })
        }

        if (username.length > 5 && password.length > 8) {
            const newUser = new User({
                username,
                password
            });
            await newUser.save();
            return res.status(201).json({
                username: username,
                password: password
            })
        } else {
            return res.status(401).json({ error: "KISA!" })
        }


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
    console.log(id, "id")
    try {
        const existingUser = await User.findOne({ username: id })
        const existingData = await Wallet.findOne({ name: data.name, username: id })

        if (existingUser && data && !existingData) {
            const newWallet = new Wallet({
                username: id,
                ...data
            })
            await newWallet.save();
            res.status(201).json(newWallet)
        } else {
            res.status(400).json({ message: "Hatalı Kullanıcı" })
        }
    } catch (error) {

    }
})

app.get('/getdata/:username', async (req, res) => {
    const { username } = req.params;
    console.log(username)
    try {
        // Veritabanı sorgusu
        const getDataByUsername = await Wallet.find({ username });

        // Veritabanından gelen veriyi kontrol et
        console.log(getDataByUsername, "getdata username");

        // Hata olup olmadığını kontrol et
        if (!getDataByUsername) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        // Başarılı durumda veriyi geri gönder
        res.status(200).json(getDataByUsername);

    } catch (error) {
        console.error(error); // Hata durumunda hatayı konsola yazdır
        res.status(500).json({ message: "Sunucu hatası" });
    }
})

app.delete('/deletedata/:name/:username', async (req, res) => {
    try {
        const { name, username } = req.params;
        // Mongoose'daki remove veya deleteOne fonksiyonunu kullanarak belirtilen ID'ye sahip belgeyi silin
        const result = await Wallet.deleteOne({ name, username });
        console.log(result)

        if (result.deletedCount === 1) {
            res.status(200).json({ success: true, message: 'Belge başarıyla silindi' });
        } else {
            res.status(404).json({ success: false, message: 'Belge bulunamadı' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Silme işlemi sırasında bir hata oluştu', error: error.message });
    }
});

app.listen(port, () => {
    connectToDatabase();
    console.log('Sunucu calıstı')
})