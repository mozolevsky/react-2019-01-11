import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ArticleList from './components/articles/article-list'
import UserForm from './components/user-form'
import Filters from './components/filters'
import {articleType} from './types'

class App extends Component {
    render() {
        const {articles} = this.props
        return (
            <div>
                <UserForm/>
                <Filters articles={articles} />
                <ArticleList articles={articles}/>
            </div>
        );
    }
}

App.propTypes = {
    articles: PropTypes.arrayOf(articleType)
}

export default App
