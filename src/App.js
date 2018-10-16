import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/index'
import AuthRoute from './common/authroute/Authroute'
import Login from './pages/login-register/Login'
import Register from './pages/login-register/Register'
import Home from './pages/home/Home'
import Chat from './pages/chat/Chat'
// 使用Switch 只会命中匹配到的第一个path 的组件,没有写path 的会直接渲染出来

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                  <AuthRoute/>
                    <Switch>
                        <Route path='/login' exact component={Login}></Route>
                        <Route path='/register' exact component={Register}></Route>
                        <Route path='/chat/:user' exact component={Chat}></Route>
                        <Route component={Home}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
