import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
    Description: { type: String, required: true }, 
    transactionId: { type: String, required: true, unique: true },
    TypeTransactions: { 
        type: String, 
        enum: ['Income', 'Outcome'],
        required: true 
    },
    Amount: { type: Number, required: true }, 
    Category: { type: String, required: true }, 
    CreateAt: { type: Date, required: true, default: Date.now }  // Date is a built-in Mongoose data type
});


export default transactionsSchema;
