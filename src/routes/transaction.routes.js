const { Router } = require('express');
const router = new Router();

const transaction = require('../controllers/transaction.controller');

router.get('/', transaction.getTransaction);
router.post('/', transaction.createTransaction);
router.delete('/:id', transaction.deleteTransaction);



module.exports= router;


