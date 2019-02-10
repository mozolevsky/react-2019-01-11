import {LOAD_COMMENTS, SUCCESS, START, FAIL} from '../constants'
import {OrderedMap, Record} from 'immutable'

const ReducerRecord = Record({
    total: 0,
    pages: new OrderedMap({})
})

const pageRecord = Record({
    comments: new OrderedMap({}),
    loading: false,
    loaded: false,
    error: null 
})

export default (state = new ReducerRecord(), action) => {
    const { type, response, payload, error} = action

    switch (type) {
        case LOAD_COMMENTS + START:
            return state
                .update('pages', pages => pages.set(payload.currentPage, new pageRecord({loading: true})))
        case LOAD_COMMENTS + SUCCESS:
            return state
                .setIn(['total'], response.total)
                .setIn(['pages', payload.currentPage, 'comments'], response.records)
                .setIn(['pages', payload.currentPage, 'loaded'], true)
                .setIn(['pages', payload.currentPage, 'loading'], false)
        case LOAD_COMMENTS + FAIL:
            return state
                .setIn(['pages', payload.currentPage, 'loading'], false)
                .setIn(['pages', payload.currentPage, 'loaded'], false)
                .setIn(['pages', payload.currentPage, 'error'], error)
        default:
            return state
    }
}
