import * as types from './action-type'

const defaultState = {
    chatMsg: [],
    toName:'',
    unRead: 0
}
export default (state = defaultState, action)=> {
    switch (action.type) {
        case types.MSG_LIST:
            return {...state, chatMsg: action.msgList, unRead: action.msgList.filter((v)=> {
                return v.read === false
                }).length,toName:action.toName}
        case types.MSG_RECV:
            return {...state,chatMsg:[...state.chatMsg,action.data],unRead:(state.unRead + action.num)}
        case types.MSG_GET:
            return {...state,chatMsg:action.data,unRead:action.unread}
        case types.MSG_READ:
            return {...state,unRead:(state.unRead - action.readNum)}
        default:
            return state
    }
}