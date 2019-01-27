import uuidv1 from 'uuid'
import {ADD_COMMENT} from '../constants'
import {addCommentId} from '../ac'

export default store => next => action => {
    if (action.type === ADD_COMMENT) {
        const commentId = uuidv1()
        const {articleId, user, text} = action.payload
        store.dispatch(addCommentId(commentId, articleId))
        action.payload = {
            user,
            text,
            commentId
        }
    }

    next(action)
}