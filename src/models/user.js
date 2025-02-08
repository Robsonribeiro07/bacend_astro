import mongoose from "mongoose";
import transactionsSchema from "./trasnctions.js"; // Importa apenas o esquema, não o modelo

const userSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true
    
  },
  transactions: [transactionsSchema] // ✅ Agora o Mongoose aceita
});

const User = mongoose.model("User", userSchema);

export default User;
