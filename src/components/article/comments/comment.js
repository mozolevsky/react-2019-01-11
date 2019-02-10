import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createCommentSelector} from '../../../selectors';
import {Comment} from '../../UI'

export const TypeComment = PropTypes.shape({
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
})

class ArticleComment extends Component {
    render() {
        return <Comment {...this.props} />
    }
}

Comment.propTypes = {
    comment: TypeComment,
    id: PropTypes.string.isRequired
}

const initMapStateToProps = () => {
    const commentSelector = createCommentSelector()
    return (store, ownProps) => {
        return {
            comment: commentSelector(store, ownProps)
        }
    }
}

export default connect(
    initMapStateToProps
)(ArticleComment)
