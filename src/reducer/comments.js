import {ADD_COMMENT, LOAD_ARTICLE_COMMENTS, SUCCESS} from '../constants'
import { arrToMap } from './utils'
import {OrderedMap, Record} from 'immutable'

const CommentRecord = Record({
    id: null,
    text: null,
    user: null
})

const ReducerRecord = Record({
    entities: new OrderedMap({})
})

export default (state = new ReducerRecord(), action) => {
    const { type, payload, randomId, response } = action

    switch (type) {
        case ADD_COMMENT:
            return state.setIn(
                ['entities', randomId],
                new CommentRecord({...payload.comment, id: randomId})
            )
        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return state.mergeIn(['entities'], arrToMap(response, CommentRecord))
        default:
            return state
    }
}
