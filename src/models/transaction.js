const mongoose = require('mongoose');

const now= new Date().getTime();

const { Schema, model} = mongoose;

const TransactionSchema = new Schema({
    value:{
        type: Number,
        required: true
    },
    date:{
        type: Number,
        default: now
    }
});

const Transaction = model('transaction', TransactionSchema);

module.exports= Transaction;