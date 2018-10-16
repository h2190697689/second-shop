const mongoose = require('mongoose')

// 连接mongo数据库
const DB_URL = 'mongodb://localhost:27017/second-shop'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function () {
    console.log('已成功')
})
mongoose.connection.on('error',function () {
    console.log('失败')
})
mongoose.connection.on('disconnected',function () {
    console.log('连接断开')
})


const models = {
    user: {
        'name': {type: String, require:true},
        'pwd': {type:String, require: true},
        'identity': {type: String, require: true},
        // 用户描述
        'author': {type: String},
        // 用户头像
        'avatar': {type: String},
        //地址
        'address': String,
        //个人拥有的商品列表
        // productList: [{
        //     'productId': String,
        //     'productName': String,
        //     'price': String,
        //     'productImage':String,
        //     'productNum':String,
        //     'productDes':String,
        //     'checked':String,
        // }],
        // 购物车列表
        cartList: [{
            'cartName': String,
            'cartPrice': String,
            'cartImage':String,
            'cartNum': String
        }]

    },
    good: {
        'productId': String,
        'productName': String,
        'price': String,
        'productImage':String,
        'productNum':String,
        'productDes':String,
        'checked':String,
        'ownerId':String
    },
    chat: {
        'chatId':{type:String, require:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'fromName':{type:String,require:true},
        'toName':{type:String,require:true},
        'read':{type:Boolean,default:false},
        'content':{type:String,require:true,'default':''},
        'create_time':{type:Number,'default':new Date().getTime()}
    }
}

for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}
// 类似mysql的表，mongo里面有文档。字段概念
// const User = mongoose.model('user', new mongoose.Schema({
//     user: {type: String, require: true},
//     age: {type: Number, require:true}
// }))
// 新增数据
// User.create({
//     name: 'imooc',
//     age: 21
// }, function (err, doc) {
//     if(!err) {
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
// })
