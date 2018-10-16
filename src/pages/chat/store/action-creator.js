import * as types from './action-type'
import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

function msgList(toName,data) {
    return {
        type: types.MSG_LIST,
        toName,
        msgList: data
    }
}

function msgRecv(data,num) {
    return{
        type:types.MSG_RECV,
        data,
        num
    }
}

function msgGet(data,unread) {
    return{
        type:types.MSG_GET,
        data,
        unread
    }
}

function msgRead(readNum) {
    return {
        type:types.MSG_READ,
        readNum
    }
}

export function getMsgList(user) {
    return (dispatch)=> {
       axios.get('/user/msgList',{params:{toId:user}}).then((res)=> {
           if(res.data.code === 0) {
               dispatch(msgList(res.data.toName,res.data.data))
           }
       })
    }
}

export function justGetList(id) {
    return (dispatch,getState)=> {
        const ownerId = getState().login.ownerId
        axios.get('/user/getList',{params:{id:id}}).then((res)=>{
            if(res.data.code === 0) {
                let msgList = res.data.data
                let unread = msgList.filter((v)=> {
                    return v.to === ownerId && v.read === false
                }).length
                // console.log(unread)
                console.log(res)
                dispatch(msgGet(res.data.data,unread))
            }
        })
    }
}

export function sendMsg({from ,to ,fromName,toName,msg}) {
    // console.log('发送')
    return (dispatch)=> {
        socket.emit('sendmsg',{from ,to ,fromName,toName,msg})
    }
}

export function readMsg({from,to}) {
    return (dispatch)=>{
        axios.post('/user/readMsg',{from,to}).then((res)=>{
            dispatch(msgRead(res.data.raw))
        })
    }
}
export function recvMsg() {
    let num = 0
    return (dispatch,getState)=> {
        const ownerId = getState().login.ownerId
        socket.on('recvmsg',function (data) {
            // console.log(data)
            if(data.to === ownerId) {
                num = 1
            }
            dispatch(msgRecv(data,num))
        })
    }
}
