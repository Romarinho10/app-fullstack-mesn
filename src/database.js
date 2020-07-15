const mongoose = require('mongoose');

const URI='mongodb://localhost/mesn-fullstack';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(db => console.log('db is connected!'))
.catch(err => console.log(err));

module.exports= mongoose;