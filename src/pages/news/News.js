import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
import userImg2 from '../../assets/imgs/user2.jpg'
import * as Actions from '../chat/store/action-creator'

const Item = List.Item
const Brief = Item.Brief

class News extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        if(!this.props.reducerChat.chatMsg.length){
            this.props.relGetList(this.props.loginReducerState.ownerId)
        }
    }
    render() {
        // console.log(this.getRelChatList())
        return (<div>
            {
                this.getRelChatList().map((v)=>{
                    return (
                        <List key={v._id}>
                        <Item onClick={()=> {this.toChat(v)}} thumb={<img style={{width:'50px',height:'50px'}} src={userImg2} alt='' />}
                              extra={<Badge text={v.unreadNum} overflowCount={99} />}
                              arrow="horizontal">
                            {this.props.loginReducerState.name === v.fromName ? v.toName : v.fromName}
                            <Brief>{v.content}</Brief>
                        </Item>
                    </List>
                    )
                })
            }
        </div>)
    }
    getRelChatList() {
        let relList = {}
        this.props.reducerChat.chatMsg.forEach((v)=> {
            if(!relList[v.chatId]){
                relList[v.chatId] = []
            }
             relList[v.chatId].push(v)
        })
        let lastList = []
        for(let i in relList) {
            let s=relList[i]
            let unreadNum = s.filter((v)=>{
                return v.read === false && v.to === this.props.loginReducerState.ownerId
            }).length
            s[s.length-1].unreadNum = unreadNum
            lastList.push(s[s.length-1])
        }
        lastList.sort((a,b)=> {
            return b.create_time - a.create_time
        })
        return lastList
    }
    toChat (v) {
        if(v.from === this.props.loginReducerState.ownerId) {
            this.props.history.push('/chat/'+v.to)
        } else {
            this.props.history.push('/chat/'+v.from)
        }
    }
}

const mapStateToProps = (state)=> {
    return {
        reducerChat:state.chat,
        loginReducerState:state.login
    }
}

const mapDispatchToProps = (dispatch)=> {
    return{
        relGetList(id) {
            dispatch(Actions.justGetList(id))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(News)