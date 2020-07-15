const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

//getting db 
const { mongoose } = require('./database');

//Settings
app.set('port', process.env.PORT || 3000);

// app.get('/', (req, res) =>{
//     res.send('Hello world!');
// });


//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

//Routes
app.use('/api/transactions', require('./routes/transaction.routes'));

//for production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/public'));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
    })
}

//starting the server
app.listen(app.get('port'), () =>{
    console.log('server on port: ' + app.get('port'));
});