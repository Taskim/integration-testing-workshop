export const fetchCatRequest = () => ({ type: 'FETCH_CAT_REQUEST' })
export const fetchCatSuccess = cat => ({ type: 'FETCH_CAT_SUCCESS', cat })
export const fetchCatFailure = error => ({ type: 'FETCH_CAT_FAILURE', error })

export const adoptCat = () => ({ type: 'ADOPT_CAT' })
