import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import './index.css'
import Main from './container'
import reducers from './reducers'
import { catWatcher } from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(catWatcher)

const App = () => (
    <Provider store={store}>
        <Main />
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
