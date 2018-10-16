import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List,TextareaItem,InputItem,Button} from 'antd-mobile'
import * as Actions from '../shop/store/action-creator'
import '../login-register/login.less'

class Publish extends Component{
    constructor(props) {
        super(props);
        this.state={
            productName : '',
            price : 0,
            productNum : 0,
            productDes : '',
            productImage : '',
            ownerId:'',
            isShow: false
        }
    }
    componentDidMount() {
        this.setState({
            ownerId:this.props.loginReducerState.ownerId
        })
    }
    render() {
        return (<div>
            <List renderHeader={() => {return (<div style={{textAlign:'center',fontSize:'20px',color:'#29A1F7'}}>请完善发布的商品信息</div>)}}>
                <InputItem
                    clear
                    placeholder="请输入商品名称"
                    onChange={(v)=> {
                       this.handleChange('productName',v)
                    }}
                >商品名称</InputItem>
                <InputItem
                    clear
                    placeholder="请输入商品单价"
                    onChange={(v)=> {
                        this.handleChange('price',v)
                    }}
                >商品单价</InputItem>
                <InputItem
                    clear
                    placeholder="请输入商品数量"
                    onChange={(v)=> {
                        this.handleChange('productNum',v)
                    }}
                >商品数量</InputItem>
                <TextareaItem
                    title="商品图片"
                    placeholder="商品图片地址"
                    data-seed="logId"
                    ref={el => this.autoFocusInst = el}
                    onChange={(v)=> {
                        this.handleChange('productImage',v)
                    }}
                    autoHeight
                />
                <TextareaItem
                    title="商品描述"
                    placeholder="商品描述"
                    data-seed="logId"
                    autoHeight
                    ref={el => this.customFocusInst = el}
                    onChange={(v)=> {
                        this.handleChange('productDes',v)
                    }}
                />
                <Button type='primary' onClick={this.handleSubmit.bind(this)}>确认发布</Button>
            </List>
            <div className={this.state.isShow ? 'error-info' : 'error-info hidden'}>{this.props.shopReducerState.msg}</div>
        </div>)
    }
    handleChange(key,v){
        this.setState({
            [key]: v
        })
    }
    handleSubmit(){
        this.props.relPublishShop(this.state,this.changeIsShow.bind(this))
    }
    changeIsShow() {
        this.setState({
            isShow: true
        })
        setTimeout(()=>{
            this.setState({
                productName : '',
                price : 0,
                productNum : 0,
                productDes : '',
                productImage : '',
                isShow: false
            })
        },3000)
    }
}


const mapStateToProps = (state)=> {
    return {
        shopReducerState:state.shop,
        loginReducerState:state.login
    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        relPublishShop(data,f) {
            dispatch(Actions.publishShop(data,f))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Publish)