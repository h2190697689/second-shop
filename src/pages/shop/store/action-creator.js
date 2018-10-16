import * as types from './action-type'
import axios from 'axios'

function shopList(data) {
    return {
        type:types.SHOP_LIST,
        data
    }
}
function shopPublish(data) {
    return {
        type:types.SHOP_PUBLISH,
        data
    }
}
export function getShopList() {
    return (dispatch) => {
        axios.get('/user/shopList').then((res)=> {
            if(res.data.code === 0) {
                dispatch(shopList(res.data.data))
            }
        })
    }
}

export function publishShop(data,f) {
    return (dispatch)=> {
        axios.post('/user/shopPublish',{...data}).then((res)=>{
            if(res.data.code === 0) {
                dispatch(shopPublish('发布成功'))
            } else {
                dispatch(shopPublish('发布失败'))
            }
            f()
        })
    }
}