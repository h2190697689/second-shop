import React, {Component} from 'react'
import {connect} from 'react-redux'
import {InputItem,NavBar,Icon,List} from 'antd-mobile'
// import browserCookies from 'browser-cookies'
import * as Actions from './store/action-creator'
import userImg from '../../assets/imgs/user.jpg'
import userImg2 from '../../assets/imgs/user2.jpg'

const Item = List.Item
const Brief = Item.Brief

class Chat extends Component{
    constructor(props) {
        super(props)
        this.state= {
            text: ''
        }
    }
    componentDidMount() {
        if(!this.props.reducerChat.toName) {
            this.props.relRecvMsg()
        }
        this.props.relMsgList(this.props.match.params.user)
    }
    componentWillUnmount(){
        const from = this.props.match.params.user
        const to = this.props.loginReducerState.ownerId
        this.props.relReadMsg({from,to})
    }

    render() {
        return (<div>
            <div style={{position:'fixed',width:'100%',top:'0',zIndex:'10'}}>
                <NavBar
                    mode="dark"
                    icon={<Icon size='lg' type="left" />}
                    onLeftClick={() => {window.history.back()}}
                >{this.props.reducerChat.toName}</NavBar>
            </div>
            <div style={{marginTop:'50px',marginBottom:'50px'}}>
                {
                    this.props.reducerChat.chatMsg.filter((v)=>{return v.chatId.indexOf(this.props.match.params.user)> -1}).map((v)=> {
                        if(v.to === this.props.match.params.user) {
                            return (<List key={v._id}>
                                    <Item style={{position:'relative'}} extra={<img style={{width:'50px',height:'50px'}} src={userImg} alt='' />}>
                                        <span style={{position:'absolute',top:'8px',right:'80px'}}>{this.props.loginReducerState.name}</span>
                                        <Brief style={{position:'absolute',top:'30px',right:'80px'}}>{v.content}</Brief>
                                    </Item>
                                </List>)
                        } else {
                            return ( <List key={v._id}>
                                <Item thumb={<img style={{width:'50px',height:'50px'}} src={userImg2} alt='' />}>
                                    {this.props.reducerChat.toName}
                                    <Brief>{v.content}</Brief>
                                </Item>
                            </List>)
                        }
                    })
                }
            </div>
            <div style={{position:'fixed',width:'100%',bottom:'0'}}>
                <InputItem placeholder='请输入' onChange={v=> {this.setState({text: v})}} value={this.state.text} extra={<span onClick={this.hangleSubmit.bind(this)} style={{marginLeft:'20px'}}>发送</span>}></InputItem>
            </div>
        </div>)
    }
    hangleSubmit() {
        // const from = browserCookies.get('userId').substr(3,24)
        const from = this.props.loginReducerState.ownerId
        const to = this.props.match.params.user
        const msg = this.state.text
        const fromName = this.props.loginReducerState.name
        const toName = this.props.reducerChat.toName
        // console.log({from,to,msg})
        // Actions.sendMsg({from,to,msg})
        // console.log(this.props.reducerChat.chatMsg)
        this.props.relSendMsg({from,to,fromName,toName,msg})
        this.setState({
            text: ''
        })
    }
}

const mapStateToProps = (state)=> {
    return {
        reducerChat: state.chat,
        loginReducerState:state.login
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        relMsgList (user) {
            dispatch(Actions.getMsgList(user))
        },
        relSendMsg ({from,to,fromName,toName,msg}) {
            dispatch(Actions.sendMsg({from,to,fromName,toName,msg}))
        },
        relRecvMsg () {
            dispatch(Actions.recvMsg())
        },
        relReadMsg({from,to}){
            dispatch(Actions.readMsg({from,to}))
        }
    }
}

export default connect(mapStateToProps,mapDispathToProps)(Chat)