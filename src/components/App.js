import React, { Component } from 'react'
import './App.css'
import Loader from './Loader.js'
import catError from './error.png'

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
            <div className="App" data-testid="app">
                <div className="img-container">
                    {status === 'loaded' && cat && (
                        <img
                            alt="cat"
                            src={cat.url}
                            data-testid="current-cat"
                        />
                    )}
                    {status === 'loading' && <Loader />}
                    {status === 'error' && (
                        <React.Fragment>
                            <img
                                src={catError}
                                alt="cat-error"
                                className="cat-error-img"
                                data-testid="error-img"
                            />
                            <div
                                className="error-message"
                                data-testid="error-message"
                            >
                                Déso, j'ai eu la flemme là frère. Réessaye.
                            </div>
                        </React.Fragment>
                    )}
                </div>
                <div className="button-container">
                    {status !== 'error' && (
                        <React.Fragment>
                            <button
                                disabled={status !== 'loaded'}
                                className="cat-button"
                                onClick={this.adopt}
                                data-testid="adopt-button"
                            >
                                Adopter ce chat
                            </button>
                            <button
                                className="cat-button nope"
                                onClick={fetchCat}
                                data-testid="fetch-button"
                            >
                                Voir un autre chat
                            </button>
                        </React.Fragment>
                    )}
                    {status === 'error' && (
                        <button
                            className="cat-button retry"
                            onClick={fetchCat}
                            data-testid="retry-button"
                        >
                            Réessayer
                        </button>
                    )}
                </div>
                {adoptedCats.length > 0 && (
                    <div
                        className="adopted-cats-container"
                        data-testid="collection"
                    >
                        <h1>
                            {`Mes chats`}
                            <span data-testid="adopted-cat-count">
                                {adoptedCats.length}
                            </span>
                        </h1>
                        <div className="adopted-cats">
                            {adoptedCats.map(cat => (
                                <div
                                    key={cat.id}
                                    className="adopted-cat"
                                    data-testid="adopted-cat"
                                >
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
