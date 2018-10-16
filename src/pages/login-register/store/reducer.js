import * as types from './action-type'

const defaultState = {
    isAuth: false,
    msg: '',
    name: '',
    pwd: '',
    identity: '',
    ownerId:''
}
export default (state = defaultState, action)=> {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {...state, isAuth: true, ...action.payload }
        case types.LOGOUT_SUCCESS:
            return { isAuth: false, msg: '', name: '', pwd: '', identity: ''} //或者 return {...defaultState}
        case types.REGISTER_SUCCESS:
            return {...state, isAuth: true, ...action.payload }
        case types.ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        default:
            return state
    }
}