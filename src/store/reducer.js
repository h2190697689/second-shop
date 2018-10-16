import {combineReducers} from 'redux'
import loginReducer from '../pages/login-register/store/reducer'
import chatReducer from '../pages/chat/store/reducer'
import shopReducer from '../pages/shop/store/reducer'

export default combineReducers({
    login: loginReducer,
    chat: chatReducer,
    shop: shopReducer
})