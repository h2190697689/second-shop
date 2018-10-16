import * as types from './action-type'
import axios from 'axios'

function errorMsg(msg) {
    return {
        type: types.ERROR_MSG,
        msg
    }
}

function admitLogin(data) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: data
    }
}

function admitRegister(data) {
    return {
        type: types.REGISTER_SUCCESS,
        payload: data
    }
}
export function login({name,pwd},f) {
    return (dispatch)=> {
        axios.post('/user/login',{name,pwd}).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.code === 0) {
                dispatch(admitLogin({name,pwd,msg: res.data.msg,ownerId:res.data.data._id}))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
            f()
        })
    }
}
export function logout() {
    return {
        type: types.LOGOUT_SUCCESS
    }
}
export function register({name,pwd,identity},f) {
    // console.log('before post')
    return (dispatch)=> {
        // console.log( 'posting')
        axios.post('/user/register', {name,pwd,identity}).then((res)=> {
            // console.log(res)
            // console.log('dispatch posting')
            if (res.status === 200 && res.data.code === 0) {
               dispatch(admitRegister({name,pwd,identity,msg: res.data.msg,ownerId:res.data.data._id}))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
            f()
        }).catch((err)=> {
            console.log(err.message)
        })
    }
}