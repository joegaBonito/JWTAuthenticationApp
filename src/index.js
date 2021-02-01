import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from './components/NotFound';
import NavbarComp from './components/NavbarComp';
import App from './App';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './store'
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist'

// let persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
            <Router>
                <div>
                <Route component={NavbarComp} />
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <ProtectedRoute exact path="/" component={App} />
                    <Route component={NotFound} />
                </Switch>
                {/* <Route component={Footer} /> */}
                </div>
            </Router>
        {/* </PersistGate> */}
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
