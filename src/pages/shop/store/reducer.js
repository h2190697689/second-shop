import * as types from './action-type'

const defaultState = {
    shopList: [],
    msg:''
}
export default (state = defaultState, action)=> {
    switch (action.type) {
        case types.SHOP_LIST:
            return {...state,shopList:action.data}
        case types.SHOP_PUBLISH:
            return {...state,msg:action.data}
        default:
            return state
    }
}