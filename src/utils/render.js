import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import reducer from '../reducers'
import { sagaMiddleware } from '../store'
import { catWatcher } from '../sagas'

export function renderWithRedux(
    ui,
    {
        initialState,
        store = createStore(
            reducer,
            initialState,
            applyMiddleware(sagaMiddleware)
        ),
    } = {}
) {
    sagaMiddleware.run(catWatcher)

    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        store,
    }
}
