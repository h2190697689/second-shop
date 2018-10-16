import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button,Modal,Result,WhiteSpace} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import userImg from '../../assets/imgs/user.jpg'
import * as Actions from '../login-register/store/action-creator'

class Person extends Component{
    constructor(props) {
        super(props)
        this.state= {
        }
    }

    render() {
        return (<div>
            <Result
                img={<img src={userImg} style={{width:'60px',height:'60px'}} alt="" />}
                title={this.props.loginReducerState.name}
                message={<div><div style={{color:'#108EE9',fontSize:'20px'}}>简介</div>
                    <WhiteSpace/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这是对后端node.js的一次尝试，
                    更是自己所希望的---个人实现全站项目的一次突破，虽说还是简陋但是大致功能已经实现，
                    还有一些细节需要完善，借用阮一峰大神的一句话——你拿在手上的，就是我这一个月，所有的诚意和坚持。
                    JavaScript这门语言会有远大的未来，但愿面前的你，也都是如此！</div>}
            />
           <Button type="primary" onClick={this.toLogout.bind(this)}>退出登录</Button>
        </div>)
    }
    toLogout() {
        // console.log(document.cookie)
        Modal.alert('注销', '确认退出登录?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {browserCookies.erase('userId');this.props.history.push('/login');this.props.relLogout()} },
        ])
    }
}

const mapStateToProps = (state)=> {
    return {
        loginReducerState: state.login
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        relLogout () {
            dispatch(Actions.logout())
        }
    }
}

export default connect(mapStateToProps,mapDispathToProps)(Person)