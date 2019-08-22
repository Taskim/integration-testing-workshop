import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { catWatcher } from './sagas'
import reducers from './reducers'

export const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(catWatcher)
