import { takeLatest, call, put } from 'redux-saga/effects'

import { fetchCat } from './api'
import { fetchCatSuccess, fetchCatFailure } from './actions'

export function* fetchCatFlow() {
    try {
        const cat = yield call(fetchCat)
        yield put(fetchCatSuccess(cat[0]))
    } catch (e) {
        yield put(fetchCatFailure(e))
    }
}

export function* catWatcher() {
    yield takeLatest('FETCH_CAT_REQUEST', fetchCatFlow)
}
