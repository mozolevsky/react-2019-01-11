import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import articles from './fixtures'

ReactDOM.render(<App articles={articles} />, document.getElementById('root'))
