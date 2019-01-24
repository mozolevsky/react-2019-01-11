import {UPDATE_FILTERS} from '../constants'

const initialFiltirs = {
    titles: [],
    dates: {
        from: undefined,
        to: undefined
    }
}

export default (filters = initialFiltirs, action) => {
    const {type, payload} = action

    switch(type) {
        case UPDATE_FILTERS:
            return {
                ...filters,
                ...payload
            }
        default:
            return filters
    }
}