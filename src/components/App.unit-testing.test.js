import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import { takeLatest, put, call } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { shallow } from 'enzyme'

import * as actions from '../actions'
import reducer from '../reducers'
import { catWatcher, fetchCatFlow } from '../sagas'
import { fetchCat } from '../api'
import App from './App'
import { mapStateToProps } from '../container'
import Loader from './Loader'

describe('unit testing', () => {
    const cat = {
        id: 'cat_id',
        url: 'https://cdn2.thecatapi.com/images/32t.gif',
    }
    describe('components', () => {
        it('renders the App', () => {
            expect(
                shallow(
                    <App
                        fetchCat={jest.fn()}
                        status="loading"
                        adoptedCats={[]}
                    />
                    // hack with jest@24 :shrug:
                ).debug()
            ).toMatchSnapshot()
            expect(
                shallow(
                    <App
                        fetchCat={jest.fn()}
                        cat={cat}
                        status="loaded"
                        adoptedCats={[cat]}
                    />
                ).debug()
            ).toMatchSnapshot()
        })
        it('adopts a cat', () => {
            const adoptCat = jest.fn()
            const fetchCat = jest.fn()
            const wrapper = shallow(
                <App
                    adoptCat={adoptCat}
                    fetchCat={fetchCat}
                    cat={cat}
                    status="loaded"
                    adoptedCats={[cat]}
                />
            )
            expect(fetchCat).toHaveBeenCalledTimes(1)
            expect(adoptCat).toHaveBeenCalledTimes(0)

            wrapper.instance().adopt()
            expect(adoptCat).toHaveBeenCalledTimes(1)
        })
        it('displays a spinning cat', () => {
            expect(shallow(<Loader />).debug()).toMatchSnapshot()

            const adoptCat = jest.fn()
            const fetchCat = jest.fn()

            const wrapper = shallow(
                <App
                    adoptCat={adoptCat}
                    fetchCat={fetchCat}
                    cat={null}
                    status="loading"
                    adoptedCats={[]}
                />
            )
            expect(wrapper.find('Loader')).toHaveLength(1)
        })
        it('displays a retry button in case of error', () => {
            const adoptCat = jest.fn()
            const fetchCat = jest.fn()

            expect(fetchCat).toHaveBeenCalledTimes(0)

            const wrapper = shallow(
                <App
                    adoptCat={adoptCat}
                    fetchCat={fetchCat}
                    cat={null}
                    status="error"
                    adoptedCats={[]}
                />
            )

            expect(fetchCat).toHaveBeenCalledTimes(1)

            expect(wrapper.find('.cat-error-img')).toHaveLength(1)
            expect(wrapper.find('.error-message')).toHaveLength(1)
            expect(wrapper.find('.retry')).toHaveLength(1)

            wrapper.find('.retry').simulate('click')
            expect(fetchCat).toHaveBeenCalledTimes(2)
        })
    })
    describe('actions', () => {
        it('returns a fetch cat request action 🐱', () => {
            expect(actions.fetchCatRequest()).toEqual({
                type: 'FETCH_CAT_REQUEST',
            })
        })
        it('returns a fetch cat success action', () => {
            expect(actions.fetchCatSuccess()).toEqual({
                type: 'FETCH_CAT_SUCCESS',
            })
        })
        it('returns a fetch cat failure action', () => {
            expect(actions.fetchCatFailure()).toEqual({
                type: 'FETCH_CAT_FAILURE',
            })
        })
        it('returns an adopt cat action', () => {
            expect(actions.adoptCat()).toEqual({
                type: 'ADOPT_CAT',
            })
        })
    })
    describe('reducer', () => {
        const initialState = {
            adoptedCats: [],
            cat: undefined,
            status: undefined,
        }
        it('returns the initial state', () => {
            expect(reducer(undefined, {})).toEqual(initialState)
        })
        it('updates the status for a cat request', () => {
            expect(reducer(undefined, { type: 'FETCH_CAT_REQUEST' })).toEqual({
                ...initialState,
                status: 'loading',
            })
        })
        it('sets a cat and updates the status when a cat is successfuly fetched', () => {
            expect(
                reducer(undefined, { type: 'FETCH_CAT_SUCCESS', cat })
            ).toEqual({
                ...initialState,
                status: 'loaded',
                cat,
            })
        })
        it('updates the status in case of failure', () => {
            expect(reducer(undefined, { type: 'FETCH_CAT_FAILURE' })).toEqual({
                ...initialState,
                status: 'error',
            })
        })
        it('updates the adopted cats', () => {
            const state = { ...initialState, cat }
            expect(reducer(state, { type: 'ADOPT_CAT' })).toEqual({
                ...state,
                adoptedCats: [cat],
            })
        })
    })
    describe('sagas', () => {
        const watcher = catWatcher()
        it('executes the fetch cat flow when a request is made', () => {
            expect(watcher.next().value).toEqual(
                takeLatest('FETCH_CAT_REQUEST', fetchCatFlow)
            )
        })
        it('tries to fetch a cat', () => {
            const generator = cloneableGenerator(fetchCatFlow)(
                actions.fetchCatRequest
            )
            const cat = { id: 'cat_id' }
            expect(generator.next().value).toEqual(call(fetchCat))
            expect(generator.next([cat]).value).toEqual(
                put(actions.fetchCatSuccess(cat))
            )
        })
        it('fails to fetch data', () => {
            const generator = cloneableGenerator(fetchCatFlow)(
                actions.fetchCatRequest
            )
            const error = new Error('Server Error')
            expect(generator.next().value).toEqual(call(fetchCat))
            expect(generator.throw(error).value).toEqual(
                put(actions.fetchCatFailure(error))
            )
        })
    })
    describe('api', () => {
        fetch.mockResponseOnce(JSON.stringify({ cat }))
        fetchCat().then(response => expect(response).toEqual({ cat }))
    })
    describe('container', () => {
        it('maps state to props 🤷‍♂️ and gives more coverage', () => {
            const initialState = {
                adoptedCats: [],
                cat: undefined,
                status: undefined,
            }
            expect(mapStateToProps(initialState)).toEqual({
                adoptedCats: [],
                cat: undefined,
                status: undefined,
            })
        })
    })
})
