import React, { Component } from 'react'
import './App.css'
import Loader from './Loader.js'

class App extends Component {
    componentDidMount() {
        this.props.fetchCat()
    }

    adopt = () => {
        this.props.adoptCat()
        this.props.fetchCat()
    }
    render() {
        const { status, cat, fetchCat, adoptedCats } = this.props
        return (
            <div className="App">
                <div className="img-container">
                    {status === 'loaded' && cat && (
                        <img
                            alt="cat"
                            src={cat.url}
                            data-testid="current-cat"
                        />
                    )}
                    {status === 'loading' && <Loader />}
                </div>
                <button
                    disabled={status !== 'loaded'}
                    className="cat-button"
                    onClick={this.adopt}
                >
                    Adopter ce chat
                </button>
                <button className="cat-button nope" onClick={fetchCat}>
                    Voir un autre chat
                </button>
                {adoptedCats.length > 0 && (
                    <div className="adopted-cats-container">
                        <h1>{`Mes chats (${adoptedCats.length})`}</h1>
                        <div className="adopted-cats">
                            {adoptedCats.map(cat => (
                                <div key={cat.id} className="adopted-cat">
                                    <img alt="adopted-cat" src={cat.url} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default App
