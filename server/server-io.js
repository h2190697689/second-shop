const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const Chat = require('./model').getModel('chat')
const userRouter = require('./user')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',function(socket){
    // console.log('user login')
    socket.on('sendmsg',function(data){
        console.log(data)
        const {from, to, msg,fromName,toName} = data
        const chatId = [from,to].sort().join('_')
        Chat.create({chatId,from,to,content:msg,fromName,toName},function(err,doc){
            // console.log(doc._doc)
            io.emit('recvmsg', Object.assign({},doc._doc))
        })
        // console.log(data)
        // io.emit('recvmsg',data)
    })
})


app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)  //开启中间件


server.listen(9093,function () {
    console.log('端口在9093监听')
})