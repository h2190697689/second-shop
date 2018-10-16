const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const Good = model.getModel('good')
const util = require('utility')

// 商品操作
Router.get('/shopList',function (req,res) {
    Good.find({},function (err,doc) {
        if(doc) {
            res.json({code:0,msg:"商品数据成功获取",data:doc})
        }
    })
})
Router.post('/shopPublish',function (req,res) {
    const {productName, price, productNum, productDes, productImage,ownerId} = req.body
    Good.create({productName, price, productNum, productDes, productImage,ownerId},function (err,doc) {
        if(err) {
            res.json({code:1,msg:'后端发布商品失败'})
        } else {
            res.json({code:0,msg:'商品发布成功'})
        }
    })
})

Router.get('/list', function (req,res,next) {
    // console.log(req.param)
    User.find({},function (err, doc) {
        return res.json(doc)
    })
})

Router.post('/login',function (req,res) {
    const {name,pwd} = req.body
    User.findOne({name,pwd: util.md5(pwd)},{pwd: 0},function (err,doc) {
        if(doc) {
            res.cookie('userId',doc._id)
            res.json({code: 0, msg: '成功登录',data: doc})
        } else {
            res.json({code: 1, msg: '用户名或密码错误'})
        }
    })
})

// 使用post提交时，需要使用body-parser插件
Router.post('/register', function (req,res) {
    // console.log(req.body)
    const {name,pwd,identity} = req.body
    User.findOne({name: name},function (err,doc) {
        if(doc) {
            res.json({code: 1,msg: '用户名重复'})
        } else {
            User.create({name,pwd: util.md5(pwd),identity},function (err1,doc1) {
                if(err1) {
                   res.json({code: 1,msg: '后端数据创建出错'})
                } else {
                    res.cookie('userId',doc1._id)
                   res.json({code: 0,msg: '注册成功',data: {_id:doc1._id,name: doc1.name,identity: doc1.identity}})
                }
            })
        }
    })
})

Router.get('/msgList',function (req,res) {
    const {toId} = req.query
    const user = req.cookies.userId
    User.findOne({_id:toId},function (outErr,outDoc) {
        Chat.find({$or:[{from: user},{to: user}]},function (err,doc) {
            if(doc) {
                // console.log(outDoc)
                res.json({code: 0,msg:'消息数据查询成功', toName:outDoc.name, data: doc})
            }
        })
    })
})

Router.get('/getList',function (req,res) {
    const {id} = req.query
    Chat.find({$or:[{from: id},{to: id}]},function (err,doc) {
        if(doc) {
            // console.log(outDoc)
            res.json({code: 0,msg:'消息数据查询成功',data: doc})
        }
    })
})

Router.post('/readMsg',function (req,res) {
    const {from,to} = req.body
    Chat.update({from,to},{$set:{read: true}},{multi:true},function (err,raw) {
        res.json({code:0,msg:'数据阅读成功',raw})
    })
})

Router.get('/info', function (req,res) {
    const {userId} = req.cookies
    if (!userId) {
        res.json({code: 1, msg: '用户未登录'})
    } else {
       res.json({code: 0, msg: '用户已登录'})
    }
})

//较为复杂的md5加密
function md5Pwd(pwd) {
    const salt = 'min_isf_very+good*f456&--!fjkd'  //自己定义
    return util.md5(util.md5(pwd + salt))
}

module.exports = Router
