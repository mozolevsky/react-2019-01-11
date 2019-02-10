import React, {Component} from 'react';
import accordion from '../../decorators/accordion';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {filteredArticlesSelector, loadedSelector, loadingSelector} from '../../selectors';
import {loadAllArticles} from '../../ac';
import {Loader} from '../UI';
import {NavLink} from 'react-router-dom';

export const TypeArticles = PropTypes.array

class ArticleList extends Component{
    static propTypes = {
        articlesFromStore: TypeArticles
    }
    render() {
        const {loading} = this.props
        return (
            loading ?
                <Loader/> :
                <ul>{this.articles}</ul>
        );
    }

    componentDidMount() {
        !this.props.loaded && this.props.fetchData && this.props.fetchData()
    }

    get articles() {
        const {
            articlesFromStore
        } = this.props

        return articlesFromStore.map(article => (
            <li key={article.id} className="test--art__container">
                <NavLink to={`/articles/${article.id}`} activeStyle={{color: 'red'}}>{article.title}</NavLink>
            </li>
        ))
    }
}

export default connect(
    store => {
        console.log('article-list connect');
        return {
            articlesFromStore: filteredArticlesSelector(store),
            loading: loadingSelector(store),
            loaded: loadedSelector(store)
        }
    },
    {
        fetchData: loadAllArticles
    }
)(accordion(ArticleList))
