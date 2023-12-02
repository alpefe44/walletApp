import mongoose from "mongoose";



export async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://localhost:27017/walletappdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB bağlantısı başarıyla kuruldu.');
    } catch (error) {
      console.error('MongoDB bağlantı hatası:', error.message);
    }
}
