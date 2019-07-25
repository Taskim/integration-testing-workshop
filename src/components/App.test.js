import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { wait, fireEvent } from '@testing-library/react'
import { renderWithRedux } from '../utils/render'
import App from '../container'
import { fetchCat } from '../api'
import uuid from 'uuidv4'

jest.mock('../api', () => ({ fetchCat: jest.fn() }))

xdescribe('Integration testing', () => {
    beforeEach(() => {
        fetchCat.mockReset()
        fetchCat.mockImplementation(() => {
            const id = uuid()
            return Promise.resolve([
                {
                    id,
                    url: `${id}_url`,
                },
            ])
        })
    })
    // debug
    xit('displays the app', () => {})
    // async / await / wait
    xit('displays a cat and 2 buttons', async () => {})
    xit('displays a loader while fetching a cat', async () => {})
    // fireEvent / DO NOT USE toHaveBeenCalledTimes()
    xit('loads an other cat when clicking on the "See an other cat" button', async () => {})
    xit('adopts a cat and add it to the collection', async () => {})
    xit('does not display the collection if no cat have been adopted', async () => {})
    xit('displays the number of cats in my collection', async () => {})
    // you should reset the mock and change its implementation 2 times here
    xit('fails to fetch a cat and user can retry', async () => {})
})
