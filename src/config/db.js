
import mongoose from 'mongoose';

async function connectDb() {

    if (mongoose.connection.readyState === 0) {  // 0 -> desconectado
        try {
            console.log("Tentando conectar ao MongoDB...");
            await mongoose.connect("mongodb+srv://Astro:gfepKT7Px0Fni0F7@cluster0.xn0ir.mongodb.net/Astro?retryWrites=true&w=majority&appName=Cluster0");
            
            console.log('Conectado ao MongoDB');
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB:', error);
        } 
    } else {
        console.log('Já existe uma conexão ativa ao MongoDB');
    } 
}

export default connectDb;