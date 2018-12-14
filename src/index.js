import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunkMiddleware  from 'redux-thunk'
import App from './App';
import tasks from './reducers';
import * as serviceWorker from './serviceWorker';

import './index.css';

const rootReducer = (state={}, action) => {
    return {
        tasks: tasks(state.tasks, action),
    }
};

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
