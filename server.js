const express = require('express')
const express_validator = require('express-validator')
const expressFileUpload = require('express-fileupload')
require('dotenv').config()
require('./db')
const PORT = process.env.PORT || 3900
const app = express()

app.use(express_validator())
app.use(expressFileUpload())
express.urlencoded({
    extended: true
})
app.use(express.json())



/**
 *   Calling all routes
 */

app.use('/api-v1-task-manager', require('./src/routes/task.route'))



app.listen(PORT, () => {
    console.log(`Server is running on port is ${PORT}`)
})