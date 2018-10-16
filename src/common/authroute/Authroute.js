import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

// 相当于拦截器概念
class Authroute extends Component{
    constructor (props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname)>-1) {
            return
        }
        axios.get('/user/info').then((res)=> {
            // console.log(this.props.history)
            if(res.data.code !== 0) {
                this.props.history.push('/login')
            }
            // console.log(res)
        })
    }
    render() {
        return (<div></div>)
    }
}

export default withRouter(Authroute)