import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as Actions from './store/action-creator'
import loginBack from '../../assets/imgs/login-wrapper.jpg'
import userImg from '../../assets/imgs/user.jpg'
import './login.less'

class Login extends Component{
    constructor(props) {
        super(props)
        this.state={
            userId: '',
            name: '',
            pwd: '',
            isError: false,
            errorMsg: ''
        }
    }
    render() {
       return (<div>
           <div className='back-ground'>
               <img src={loginBack} alt=''/>
           </div>
           <div className='user-icon'>
               <img src={userImg} alt=''/>
           </div>
           <div className='login-wrapper'>
               <input className='name' type='text' onChange={(e)=> {this.handleChange('name',e)}} placeholder='用户名'/><br/>
               <input className='password' type='password' onChange={(e)=> {this.handleChange('pwd',e)}} placeholder='密&nbsp;码'/><br/>
               <button className='login-btn' onClick={this.toLogin.bind(this)}>登录</button><br/>
               <button className='register-btn' onClick={this.toRegister.bind(this)}>注册</button>
           </div>
           <div className={this.state.isError ? 'error-info' : 'error-info hidden'}>{this.state.errorMsg}</div>
       </div>)
    }
    handleChange(key,e){
        // console.log(e.target.value)
        this.setState({
            [key]: e.target.value
        })
    }
    toLogin () {
        // console.log(this.props)
        let {name,pwd} = this.state
       if (!name || !pwd) {
            this.setState({
                isError: true,
                errorMsg: '用户名密码不能为空'
            })
           setTimeout(() => {
               this.setState({
                   isError: false
               })
           }, 2000)
           return
       }
       this.props.relLogin(this.state,this.callBackLogin.bind(this))
    }
    callBackLogin () {
        // console.log('callback')
        this.setState({
            isError: true,
            errorMsg: this.props.reducerState.msg
        })
        setTimeout(()=> {
            this.setState({
                isError: false
            })
            if(this.props.reducerState.isAuth){
                this.props.history.push('/shop')
            }
        }, 2000)
    }
    toRegister () {
        // console.log(this.props)
        this.props.history.push('/register')
    }
}

const mapStateToProps = (state) => {
    return {
        reducerState: state.login
    }
}

const mapDispathToProps = (dispatch)=> {
    return{
        relLogin(user,f) {
            dispatch(Actions.login(user,f))
        }
    }
}
export default connect(mapStateToProps,mapDispathToProps)(Login)

