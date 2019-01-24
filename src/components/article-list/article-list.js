import React, {Component} from 'react';
import Article, {TypeArticle} from '../article';
import accordion from '../../decorators/accordion';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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

    applyFiltering = article => {
        /**
         * TODO: make code refactoring
         */
        let isTitleFilterPassed = true
        let isDateStartFilteringPassed = true
        let isDateFilteringEndPassed = true

        if (this.props.titleFilteringParams.length) {
            isTitleFilterPassed = this.props.titleFilteringParams
                .map(v => v.label)
                .includes(article.title)
        }

        if (this.props.dateStartFilteringParam) {
            isDateStartFilteringPassed = new Date(article.date) >= this.props.dateStartFilteringParam
        }

        if (this.props.dateEndFilteringParam) {
            isDateStartFilteringPassed = new Date(article.date) <= this.props.dateStartFilteringParam
        }
        
        return isTitleFilterPassed && isDateStartFilteringPassed && isDateFilteringEndPassed
    }

    get articles() {
        const {
            openItemId,
            toggleOpenArticle,
            articlesFromStore
        } = this.props

        return articlesFromStore
        .filter(this.applyFiltering)
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
    titleFilteringParams: store.filters.titles,
    dateStartFilteringParam: store.filters.dates && store.filters.dates.from,
    dateEndFilteringParam: store.filters.dates && store.filters.dates.to
})

export default connect(
    mapStateToProps
)(accordion(ArticleList))
