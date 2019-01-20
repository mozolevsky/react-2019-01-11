import React, { Component } from 'react'
import Comment from './comment'
import toggleOpen from '../../decorators/toggleOpen'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {commentType} from '../../types'
import './comment.css'

class CommentList extends Component {
    render() {
        const {toggleOpenItem, isOpen} = this.props
        return (
            <div>
                <button onClick={toggleOpenItem}>
                    {isOpen ? 'hide comments' : 'show comments'}
                </button>
                <ReactCSSTransitionGroup
                    transitionName='comment'
                    transitionEnterTimeout={400}
                    transitionLeaveTimeout={300}>
                    {this.body}
                </ReactCSSTransitionGroup>
            </div>
        )
    }

    get body() {
        const {comments, isOpen} = this.props
        return isOpen ? (
            comments && comments.length ? (
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id}>
                            <Comment comment={comment} />
                        </li>
                    ))}
                </ul>
            ) : <h3>No comments yet</h3>
        ) : null
    }
}

CommentList.propTypes = {
    isOpen: PropTypes.bool,
    toggleOpenItem: PropTypes.func,
    comments: PropTypes.arrayOf(commentType)
}

/**
 * Question: to Maxim
 * maybe the better idea to export CommentList here without decorator.
 * And make a new component with name like SwitchableCommentList for following reasons: 
 * better reusability of the CommentList component
 * the testing process will be more clear
 */
export default toggleOpen(CommentList)
