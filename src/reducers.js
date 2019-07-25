const initialState = {
    cat: undefined,
    status: undefined,
    adoptedCats: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CAT_REQUEST':
            return {
                ...state,
                status: 'loading',
            }
        case 'FETCH_CAT_SUCCESS':
            return {
                ...state,
                cat: action.cat,
                status: 'loaded',
            }
        case 'FETCH_CAT_FAILURE':
            return {
                ...state,
                status: 'error',
            }
        case 'ADOPT_CAT':
            return {
                ...state,
                adoptedCats: [...state.adoptedCats, state.cat],
            }
        default:
            return state
    }
}

export default reducer
