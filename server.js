const mongoose = require('mongoose')
const dotend = require('dotenv')
const app = require('./app')
dotend.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful!'))


const port = process.env.PORT
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})