import {createSelector} from 'reselect';

export const filtersSelector = (store) => store.filters
export const loadingSelector = (store) => store.articles.loading
export const loadedSelector = (store) => store.articles.loaded
export const articlesMapSelector = (state) => state.articles.entities
export const articlesSelector = createSelector(
    articlesMapSelector,
    (articlesMap) => articlesMap.valueSeq().toArray()
)
export const idSelector = (_, ownProps) => ownProps.articleId

export const filteredArticlesSelector = createSelector(
    filtersSelector,
    articlesSelector,
    (filters, articles) => {
        const {selected, dateRange: {from, to}} = filters

        console.log('filteredArticlesSelector');

        return articles.filter(article => {
            const publishedDate = Date.parse(article.date)
            return (
                    !selected.length ||
                    selected.find((selected) => selected.value === article.id)
                ) &&
                (
                    (!from || !to || (publishedDate > from && publishedDate < to))
                )
        })
    }
)

export const commentsDataForArticleSelector = createSelector(
    articlesSelector,
    idSelector,
    (articlesMap, id) => {
        return articlesMap.find(v => v.id === id).comments
    }
)

export const commentsForArticleSelector = createSelector(commentsDataForArticleSelector, data => data.entities)
export const loadingCommentsSelector = createSelector(commentsDataForArticleSelector, data => data.loading)
export const loadedCommentsSelector = createSelector(commentsDataForArticleSelector, data => data.loaded)