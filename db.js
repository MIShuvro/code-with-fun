const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/task-manager-api', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(res => {
        console.log('database connected')
    })
    .catch(error => {
        console.log('Database disconnected')
    })