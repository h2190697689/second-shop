const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)  //开启中间件
app.get('/',function (req,res) {
    res.send('<h1>express Niha=</h1>')
})

app.get('/data',function (req,res) {
    res.json({name: 'HJM',type: 'IT'})
})


app.listen(9093,function () {
    console.log('端口在9093监听')
})