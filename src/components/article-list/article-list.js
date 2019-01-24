import React, {Component} from 'react';
import Article, {TypeArticle} from '../article';
import accordion from '../../decorators/accordion';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {applyFiltering} from './utils'

export const TypeArticles = PropTypes.arrayOf(TypeArticle)

class ArticleList extends Component{
    static propTypes = {
        articlesFromStore: TypeArticles
    }

    render() {
        return <ul>{this.articles}</ul>;
    }

    componentDidMount() {
        this.props.fetchData && this.props.fetchData()
    }

    get articles() {
        const {
            openItemId,
            toggleOpenArticle,
            articlesFromStore,
            titles,
            dateStart,
            dateEnd
        } = this.props

        return articlesFromStore
        .filter(applyFiltering(titles, dateStart, dateEnd))
        .map(article => (
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

const mapStateToProps = store => ({
    articlesFromStore: store.articles,
    titles: store.filters.titles,
    dateStart: store.filters.dates && store.filters.dates.from,
    dateEnd: store.filters.dates && store.filters.dates.to
})

export default connect(
    mapStateToProps
)(accordion(ArticleList))
