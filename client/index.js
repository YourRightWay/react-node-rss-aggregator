// import 'babel-polyfill';
// import React from 'react';
// import ReactDOM from 'react-dom';
//
// // =========================================
// // REDUX
// // =========================================
// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
// import rootReducer from './reducers/app-reducer'
//
// // =========================================
// // ROUTER
// // =========================================
// import { Router, Route, browserHistory, IndexRoute } from 'react-router'
// import { syncHistoryWithStore } from 'react-router-redux'
//
// // =========================================
// // MIDDLEWARE
// // =========================================
// import createLogger from 'redux-logger'
// import thunk from 'redux-thunk'
// import PureActionMiddleware from './middleware/pure-action-middleware'
// import Ls from './middleware/local-storage-middleware'
// import DebuggerMiddleware from './middleware/debug-middleware'
// import ValidateMiddleware from './middleware/validate-middleware'
//
// // =========================================
// // CREATE STORE
// // =========================================
// const mainStore = (function configureMainStore(initialState) {
//
//     const logger = createLogger();
//
//     const store = createStore(
//         rootReducer,
//         initialState,
//         compose(
//             __DEVELOPMENT__ ? applyMiddleware(
//                 thunk,
//                 logger,
//                 PureActionMiddleware,
//                 Ls,
//                 DebuggerMiddleware,
//                 ValidateMiddleware
//             ) : applyMiddleware(thunk, PureActionMiddleware, Ls, ValidateMiddleware)
//         )
//     );
//
//     return store
//
// })();
//
// // =========================================
// // REDUX SYNC ROUTER
// // =========================================
// const history = syncHistoryWithStore(browserHistory, mainStore);
//
// import Layout from './containers/layout'; 
//
// ReactDOM.render( <Provider store={mainStore}>
//     <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
//         <Route path='/' component={Layout}>
//            
//         </Route>
//     </Router>
// </Provider>, document.getElementById('root'));

var socket = new WebSocket("ws://javascript.ru/ws");
console.log(socket)

socket.onopen = function() {
    alert("Соединение установлено.");
};


























