import {
    ADD_COMMENT, 
    DELETE_ARTICLE, 
    LOAD_ALL_ARTICLES, 
    START, 
    SUCCESS, 
    FAIL, 
    LOAD_ARTICLE,
    LOAD_COMMENTS_FOR_ARTICLE
} from '../constants';
import {arrToMap} from './utils'
import {Record} from 'immutable';

const CommentRecord = Record({
    id: null,
    text: null,
    user: null
})

const ArticleRecord = Record({
    id: null,
    text: null,
    title: null,
    date: null,
    loading: false,
    comments: {
        entities: arrToMap([], CommentRecord),
        loading: false,
        loaded: false,
        error: null
    }
})

const ReducerState = Record({
    entities: arrToMap([], ArticleRecord),
    loading: false,
    loaded: false,
    error: null
})

export default (articles = new ReducerState(), action) => {
    const { type, payload, randomId, response, error } = action

    switch (type) {
        case DELETE_ARTICLE:
            return articles.deleteIn(['entities', payload.id])

        case ADD_COMMENT:
            return articles.updateIn(
                ['entities', payload.articleId, 'comments', 'entities'],
                (comments) => {
                    return [...comments, {...payload.comment, id: randomId}]
                }
            )

        case LOAD_ALL_ARTICLES + START:
            return articles.set('loading', true)

        case LOAD_ALL_ARTICLES + SUCCESS:
            return articles
                .set('loading', false)
                .set('loaded', true)
                .set('entities', arrToMap(response, ArticleRecord))

        case LOAD_ALL_ARTICLES + FAIL:
            return articles
                .set('loading', false)
                .set('loaded', false)
                .set('error', error)

        case LOAD_ARTICLE + START:
            return articles.setIn(['entities', payload.id, 'loading'], true)

        case LOAD_ARTICLE + SUCCESS:
            return articles
                .setIn(['entities', response.id], response)
                .setIn(['entities', payload.id, 'loading'], false)

        case LOAD_ARTICLE + FAIL:
            return articles
                .set('loading', false)
                .set('error', error)
        
        case LOAD_COMMENTS_FOR_ARTICLE + START:
            return articles
                .setIn(['entities', payload.articleId, 'comments', 'loading'], true)

        case LOAD_COMMENTS_FOR_ARTICLE + SUCCESS: 
            return articles
                .setIn(['entities', payload.articleId, 'comments'], {})
                .setIn(['entities', payload.articleId, 'comments', 'loading'], false)
                .setIn(['entities', payload.articleId, 'comments', 'loaded'], true)
                .setIn(['entities', payload.articleId, 'comments', 'entities'], response)

        case LOAD_COMMENTS_FOR_ARTICLE + FAIL:
            return articles
                .setIn(['entities', payload.articleId, 'comments', 'loading'], false)
                .setIn(['entities', payload.articleId, 'comments', 'error'], error)

        default:
            return articles
    }
}
