import {
    INCREMENT,
    DELETE_ARTICLE,
    CHANGE_SELECTION,
    CHANGE_DATE_RANGE,
    RESET_DATE_RANGE,
    ADD_COMMENT,
    LOAD_ALL_ARTICLES, 
    LOAD_ARTICLE, 
    START, 
    SUCCESS, 
    FAIL,
    LOAD_COMMENTS_FOR_ARTICLE
} from '../constants';

export const increment = () => ({
    type: INCREMENT
})

export const deleteArticle = (id) => ({
    type: DELETE_ARTICLE,
    payload: {id}
})

export const changeSelection = (selected) => ({
    type: CHANGE_SELECTION,
    payload: {selected}
})

export const changeDateRange = (dateRange) => ({
    type: CHANGE_DATE_RANGE,
    payload: {dateRange}
})

export const resetDateRange = () => ({
    type: RESET_DATE_RANGE
})

export function addComment(comment, articleId) {
    return {
        type: ADD_COMMENT,
        payload: { comment, articleId },
        generateId: true
    }
}

export function loadAllArticles() {
    return dispatch => {
        dispatch({
            type: LOAD_ALL_ARTICLES + START
        })

        fetch('/api/article')
            .then(res => res.json())
            .then(res => dispatch({
                type: LOAD_ALL_ARTICLES + SUCCESS,
                response: res
            }))
            .catch(error => dispatch({
                type: LOAD_ALL_ARTICLES + FAIL,
                error
            }))
    }
}

export function loadArticle(id) {
    return (dispatch) => {
        dispatch({
            type: LOAD_ARTICLE + START,
            payload: {id}
        })
        fetch(`/api/article/${id}`)
            .then(res => res.json())
            .then(response => dispatch({
                type: LOAD_ARTICLE + SUCCESS,
                payload: {id},
                response
            }))
            .catch(error => dispatch({
                type: LOAD_ARTICLE + FAIL,
                payload: {id},
                error
            }))

    }
}

export function loadCommentsForArticle(articleId) {
    return dispatch => {
        dispatch({
            type: LOAD_COMMENTS_FOR_ARTICLE + START,
            payload: {articleId}
        })
        fetch(`/api/comment?article=${articleId}`)
            .then(res => res.json())
            .then(res => dispatch({
                type: LOAD_COMMENTS_FOR_ARTICLE + SUCCESS,
                payload: {articleId},
                response: res
            }))
            .catch(error => dispatch({
                type: LOAD_COMMENTS_FOR_ARTICLE + FAIL,
                payload: {articleId},
                error
            }))
    }
}
