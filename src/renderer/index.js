import React, {Component} from 'react'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import Page from './containers/page'
import {reducer} from './reducers/reducers'

const store = createStore(reducer, applyMiddleware(thunk, logger));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Page/>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))