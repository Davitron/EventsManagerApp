import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './app/components/Header/Header';
import Landing from './app/components/Landing/Landing';
import Home from './app/components/Landing/Home/Home';
import SignIn from './app/components/Landing/SignIn/SignIn';
import SignUp from './app/components/Landing/SignUp/SignUp';
import ForgotPassword from './app/components//Landing/ForgotPassword/ForgotPassword';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(
    <BrowserRouter>
        <Route path='/' component={App}/>
    </BrowserRouter>,
    document.getElementById('root')
);

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/SignIn' component={SignIn}/>
            <Route exact path='/SignUp' component={SignUp}/>
            <Route exact path='/ForgotPassword' component={ForgotPassword}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('landing')
);
registerServiceWorker();
