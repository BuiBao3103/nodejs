const dotend = require('dotenv')
const app = require('./app')
dotend.config({path:'./config.env'})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})