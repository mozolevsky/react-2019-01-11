import {INCREMENT, DELETE_ARTICLE, UPDATE_FILTERS} from '../constants';

export const increment = () => ({
    type: INCREMENT
})

export const deleteArticle = id => ({
    type: DELETE_ARTICLE,
    payload: {id}
})

export const updateFilters = filters => ({
    type: UPDATE_FILTERS,
    payload: filters
})
