import React, {Component} from 'react'
import {connect} from 'react-redux'
import loginBack from '../../assets/imgs/login-wrapper.jpg'
import userImg from '../../assets/imgs/user.jpg'
import * as Actions from './store/action-creator'
import {Icon} from 'antd-mobile'
import './login.less'

class Register extends Component{
    constructor(props){
        super(props)
        this.state= {
            name: '',
            pwd:'',
            repwd:'',
            identity: 'merchant',
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
            <Icon size='lg' color='#03A9F4' style={{marginTop:'6px'}} onClick={()=> {window.history.back()}} type="left"/>
            <div className='register-wrapper'>
                <div className='item-wrapper'><label>用&nbsp;户&nbsp;名</label><input className='input-item' type='text' onChange={this.handleChange.bind(this, 'name')} placeholder='用户名'/></div>
                <div className='item-wrapper'><label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label><input className='input-item' type='password' onChange={(e)=> {this.handleChange('pwd', e)}} placeholder='密码'/></div>
                <div className='item-wrapper'><label>确认密码</label><input className='input-item' placeholder='确认密码' onChange={(e)=> {this.handleChange('repwd',e)}} type='password'/></div>
                <div className='item-wrapper'><label>商&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家</label><input name='identity'value='merchant' checked={this.state.identity === 'merchant'} className='radio-item' onChange={(e)=> {this.handleChange('identity', e)}} type='radio'/></div>
                <div className='item-wrapper'><label>顾&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客</label><input name='identity' value='customer' checked={this.state.identity === 'customer'} className='radio-item' onChange={(e)=> {this.handleChange('identity', e)}} type='radio'/></div>
                <div className='item-wrapper'> <button className='register-btn' onClick={this.handleRegister.bind(this)}>注册</button></div>
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
    handleRegister () {
        let {name, pwd, repwd} = this.state
        if (!name || !pwd || !repwd) {
            // console.log('用户名，密码必须输入')
            this.setState({
                isError: true,
                errorMsg: '用户名，密码必须输入'
            })
            setTimeout(() => {
                this.setState({
                    isError: false
                })
            }, 2000)
            return
        }
        if (pwd !== repwd) {
            this.setState({
                isError: true,
                errorMsg: '请保持两次密码一致'
            })
            setTimeout(() => {
                this.setState({
                    isError: false
                })
            }, 2000)
            return
        }
        this.props.relRegister(this.state,this.callBackRegister.bind(this))
    }
    callBackRegister () {
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
}

const mapStateToProps = (state) => {
    return {
        reducerState: state.login
    }
}

const mapDispatchToProps = (dispatch)=> {
    return{
        relRegister(user,f) {
            dispatch(Actions.register(user,f))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register)

