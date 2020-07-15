
const Transaction = require('../models/transaction');

const transactionCtrl = {};

transactionCtrl.getTransaction = async (req, res) => {
    try {
        const transactions = await Transaction.find(); //encuentra y muestra todas las transacciones
        if (!transactions) {
            throw new Error('No transactions!!');
        }
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

transactionCtrl.createTransaction = async (req, res) => {
    const { value, date} = req.body; //agregamos datos al req.body
    const newTransaction = new Transaction({ value, date}); //asignamos los valores ingresados
    try {
        const transaction = await newTransaction.save();
        if (!transaction){
            throw new Error('Error saving transaction!!');
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

transactionCtrl.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = Transaction.findById(id); //buscamos la transacccion por su id
        if (!transaction){
            throw new Error('No transaction was found!!');
        }
        const removed = await transaction.deleteMany(); //eliminamos la transaccions de la db
        if (!removed){
            throw new Error('There was a problem deleting the transaction!!');
        }
        res.status(200).json( { id }); //muestra id eliminada
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = transactionCtrl;