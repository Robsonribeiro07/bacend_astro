import express from 'express' 
import cors from 'cors'
import transctions from './router/trasnctions.js'
import connectDb from './config/db.js'

const app = express()

app.use(cors())

app.use(express.json())

connectDb()

app.use('/api', transctions)
const port = 3034
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`)

})