require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')

const connectDB = require('./config/db.config')
connectDB()

const multer = require('multer')

const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "images")
    },
    filename: (req,file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage})
app.post('/api/upload', upload.single("file"), (req,res) => {
    res.status(200).json("File has been uploaded")
})

const authRoute = require('./routers/auth')
const userRoute = require('./routers/user.route')
const postRoute = require('./routers/post.route')

//MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/images', express.static(path.join(__dirname, '/images')))

app.use('/api/auth', authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts', postRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server up and running on Port ${PORT}`)
})