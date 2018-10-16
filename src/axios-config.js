import axios from 'axios'
import {Toast} from 'antd-mobile'

//请求拦截
axios.interceptors.request.use((config)=> {
    Toast.loading('加载中', 0)
    return config
})

// 回应后拦截
axios.interceptors.response.use((config)=> {
    Toast.hide()
    return config
})