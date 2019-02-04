import React, {Component} from 'react';
import Article from '../article';
import accordion from '../../decorators/accordion';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {filteredArticlesSelector, loadedSelector, loadingSelector} from '../../selectors';
import {loadAllArticles} from '../../ac';
import Loader from '../common/loader';

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
            openItemId,
            toggleOpenArticle,
            articlesFromStore
        } = this.props

        return articlesFromStore.map(article => (
            <li key={article.id} className="test--art__container">
                <Article
                    article={article}
                    isOpen={article.id === openItemId}
                    toggleArticle={toggleOpenArticle}
                />
            </li>
        ))
    }
}

export default connect(
    store => {
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
