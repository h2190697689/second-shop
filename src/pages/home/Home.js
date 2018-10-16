import React , {Component} from 'react'
import Shop from '../shop/Shop'
import Publish from '../publish/Publish'
import News from '../news/News'
import Person from '../person/Person'
import {Route, Switch} from 'react-router-dom'
import {TabBar,NavBar} from 'antd-mobile'
import {connect} from 'react-redux'


class Home extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    render() {
        const {pathname} = this.props.location
        const navList = [
            {
                path:'/shop',
                text:'市场',
                component:Shop
            },
            {
                path:'/publish',
                text:'发布',
                component:Publish
            },
            {
                path:'/news',
                text:'消息',
                component:News
            },
            {
                path:'/person',
                text:'个人',
                component:Person
            }
        ]

        return (
            <div>
                <NavBar style={{ backgroundColor: 'rgba(255,91,5,0.8)'}}>{navList.find(v=>v.path===pathname) ?navList.find(v=>v.path===pathname).text: ''}</NavBar>
                <div>
                    <Switch>
                    {navList.map((v)=> {
                        return (<Route key={v.path} path={v.path} component={v.component}></Route>)
                    })}
                    </Switch>
                </div>
                <div style={{position: 'fixed',width: '100%',bottom: '0'}}>
                    <TabBar>
                        <TabBar.Item
                            title="Shop"
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                            />
                            }
                            selected={pathname === '/shop'}
                            onPress={() => {
                                this.props.history.push('/shop')
                            }}
                        >
                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                                />
                            }
                            title="Publish"
                            key="Publish"
                            badge={'new'}
                            selected={pathname === '/publish'}
                            onPress={() => {
                                this.props.history.push('/publish')
                            }}
                            data-seed="logId1"
                        >
                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                                />
                            }
                            title="Friend"
                            key="Friend"
                            badge={this.props.chatReducerState.unRead}
                            selected={pathname === '/news'}
                            onPress={() => {
                                this.props.history.push('/news')
                            }}
                        >
                        </TabBar.Item>
                        <TabBar.Item
                            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                            title="My"
                            key="my"
                            selected={pathname === '/person'}
                            onPress={() => {
                                this.props.history.push('/person')
                            }}
                        >
                        </TabBar.Item>
                    </TabBar
                    >
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=> {
    return {
        chatReducerState: state.chat
    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)


