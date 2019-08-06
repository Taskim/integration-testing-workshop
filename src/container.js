import { connect } from 'react-redux'
import App from './components/App.js'
import { fetchCatRequest, adoptCat } from './actions'

export const mapStateToProps = state => ({
    cat: state.cat,
    status: state.status,
    adoptedCats: state.adoptedCats,
})

export default connect(
    mapStateToProps,
    { fetchCat: fetchCatRequest, adoptCat }
)(App)
