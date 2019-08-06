import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import React from 'react'
import { render, wait } from '@testing-library/react'
import { mount } from 'enzyme'

import App from '../container'
import reducer from '../reducers'
import { fetchCatRequest } from '../actions'

function renderWithRedux(
    ui,
    { initialState, store = createStore(reducer, initialState) } = {}
) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store,
    }
}

xit('renders the App', async () => {
    const { container, getByTestId } = renderWithRedux(<App />)
    // console.log(container.debug())
    debugger
    expect(1).toBe(1)
    // await wait(() => {
    expect(getByTestId('loader')).toBeInTheDocument()
    // })
})
