import React, { useEffect } from 'react'
import './App.css'
import Loader from './Loader.js'

function App({ fetchCat, adoptCat, cat, adoptedCats, status }) {
    useEffect(() => {
        fetchCat()
    }, [fetchCat])

    const adopt = () => {
        adoptCat()
        fetchCat()
    }

    return (
        <div className="App">
            <div className="img-container">
                {status === 'loaded' && cat && <img alt="cat" src={cat.url} />}
                {status === 'loading' && <Loader />}
            </div>
            <button
                disabled={status !== 'loaded'}
                className="cat-button"
                onClick={adopt}
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

export default App
