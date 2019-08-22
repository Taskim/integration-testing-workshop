import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import React from 'react'
import { render, wait } from '@testing-library/react'

import App from '../container'
import reducer from '../reducers'
import { fetchCat } from '../api'
import { sagaMiddleware } from '../store'

import { catWatcher } from '../sagas'

jest.mock('../api')

function renderWithRedux(
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

it('renders the App', async () => {
    const { getByTestId, queryByTestId } = renderWithRedux(<App />)

    expect(getByTestId('loader')).toBeInTheDocument()
    expect(queryByTestId('current-cat')).not.toBeInTheDocument()

    await wait(() => {
        expect(queryByTestId('loader')).not.toBeInTheDocument()
        expect(getByTestId('current-cat')).toBeInTheDocument()
    })
})
