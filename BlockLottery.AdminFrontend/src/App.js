import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import Index from './routes/Index/index'
import './App.css'
import './assets/font/iconfont.css'


class App extends Component {
    render() {
        return (
            <Switch>
                <Route path='/' component={Index}/>
            </Switch>
        )
    }
}

export default App;
