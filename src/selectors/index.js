import {createSelector} from 'reselect';

export const filtersSelector = (store) => store.filters
export const loadingSelector = (store) => store.articles.loading
export const loadedSelector = (store) => store.articles.loaded
export const articlesMapSelector = (state) => state.articles.entities
export const articlesSelector = createSelector(
    articlesMapSelector,
    (articlesMap) => articlesMap.valueSeq().toArray()
)
export const commentsSelector = (store) => store.comments.entities
export const idSelector = (_, ownProps) => ownProps.id
export const articleSelector = createSelector(articlesMapSelector, idSelector, (articles, id) => articles.get(id))

export const filteredArticlesSelector = createSelector(
    filtersSelector,
    articlesSelector,
    (filters, articles) => {
        const {selected, dateRange: {from, to}} = filters
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

export const createCommentSelector = () => createSelector(
    commentsSelector,
    idSelector,
    (comments, id) => {
        return comments.get(id)
    }
)

export const pageWithCommentsSelector = (store, ownProps) => store.allComments.pages.get(ownProps.pageNumber)

export const pageCommentsSelector = () => createSelector(
    pageWithCommentsSelector,
    page => page && page.comments
)

export const pageCommentsLoadingSelector = () => createSelector(
    pageWithCommentsSelector,
    page => page && page.loading
)


export const pageCommentsLoadedSelector = () => createSelector(
    pageWithCommentsSelector,
    page => page && page.loaded
)

