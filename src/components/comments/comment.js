import React from 'react'
import {commentType} from '../../types'

const Comment = props => {
    const {user, text} = props.comment
    return (
        <div>
            <h4>{user}</h4>
            <p>{text}</p>
        </div>
    )
}

Comment.propTypes = {
    props: commentType
}

export default Comment
