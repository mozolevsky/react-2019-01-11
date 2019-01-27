import {normalizedArticles} from '../fixtures';
import {DELETE_ARTICLE, ADD_COMMENT_ID} from '../constants';

export default (articles = normalizedArticles, action) => {
    const {type, payload} = action
    switch (type) {
        case DELETE_ARTICLE:
            return articles.filter(article => article.id !== payload.id)
        case ADD_COMMENT_ID: 
            return articles.map(article => article.id === payload.articleId
                ? {
                    ...article,
                    comments: [
                        ...article.comments,
                        payload.commentId
                    ]
                } : article
            )
        default:
            return articles
    }
}