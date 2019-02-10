import {combineReducers} from 'redux';
import counterReducer from './counter';
import articlesReducer from './articles';
import filtersReducer from './filters';
import commentsReducer from './comments';
import mainCommentsReducer from './main-comments'

export default combineReducers({
    count: counterReducer,
    articles: articlesReducer,
    comments: commentsReducer,
    filters: filtersReducer,
    allComments: mainCommentsReducer
})
