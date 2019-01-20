import {
    string,
    shape,
    arrayOf
} from 'prop-types'

export const commentType = shape({
    id: string,
    user: string,
    text: string
})

export const articleType = shape({
    id: string,
    date: string,
    title: string,
    text: string,
    comments: arrayOf(commentType)
})
