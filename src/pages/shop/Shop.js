import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as Actions from './store/action-creator'
import {List} from 'antd-mobile'


const Item = List.Item;
const Brief = Item.Brief;

class Shop extends Component{
    constructor(props) {
        super(props);
        this.state={}
    }
    componentDidMount() {
        this.props.relShopList()
    }
    render() {
        return (<div style={{marginBottom:'50px'}}>
            <List>
                {
                    this.props.shopReducerState.shopList.map((v)=> {
                        return ( <Item
                            key={v._id}
                            arrow="horizontal"
                            multipleLine
                            thumb={<img style={{width:'60px',height:'60px'}} src={v.productImage} alt=''/>}
                            extra={<span style={{color:'#29A1F7',fontSize:'16px'}}>联系卖家</span>}
                            onClick={() => {this.props.history.push('/chat/'+ v.ownerId)}}
                            platform="android"
                        >
                            {v.productName}<Brief> <span style={{color:'#FD7936',fontSize:'18px',marginRight:'10px'}}>${v.price}</span> <span style={{color:'#F7DE1F'}}>余货：{v.productNum} </span><br />
                            描述：{v.productDes}
                        </Brief>
                        </Item>)
                    })
                }
            </List>
        </div>)
    }
}


const mapStateToProps = (state)=> {
    return {
        shopReducerState: state.shop
    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        relShopList() {
            dispatch(Actions.getShopList())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Shop)