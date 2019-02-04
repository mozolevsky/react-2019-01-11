import React, { Component } from 'react'
import Comment from '../comment/comment'
import toggleOpen from '../../decorators/toggleOpen'
import PropTypes from 'prop-types';
import CSSTransition from 'react-addons-css-transition-group'
import './comment-list.css';
import CommentForm from '../comment-form';
import {connect} from 'react-redux';
import {loadCommentsForArticle} from '../../ac'
import {
    commentsForArticleSelector,
    loadingCommentsSelector,
    loadedCommentsSelector
} from '../../selectors'
import Loader from '../common/loader'


export const TypeComments = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object
])

class CommentList extends Component {
    static propTypes = {
        comments: TypeComments,
        articleId: PropTypes.string,
        // from decorator
        isOpen: PropTypes.bool,
        toggleOpenItem: PropTypes.func.isRequired
    }

    static defaultProps = {
        comments: []
    }

    componentDidUpdate() {
        const {isOpen, fetchData, articleId, loading, loaded} = this.props

        if(isOpen && !loading && !loaded) {
            fetchData && fetchData(articleId)
        }
    }

    render() {
        const {isOpen, toggleOpenItem} = this.props
        return (
            <div>
                <button onClick={toggleOpenItem} className="test--comment-list__btn">
                    {isOpen ? 'hide comments' : 'show comments'}
                </button>
                <CSSTransition
                    transitionName="comment-list"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}

                >
                    {this.body}
                </CSSTransition>
            </div>
        )
    }

    get body() {
        const {
            articleId,
            isOpen,
            comments,
            loading
        } = this.props

        if (!isOpen) return null;

        const body = loading ? 
            <Loader /> : comments.length ? (
                        <ul>
                            {comments.map(comment => (
                                <li key={comment.id} className="test--comment-list__item">
                                    <Comment comment={comment} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <h3 className="test--comment-list__empty">No comments yet</h3>
                    )

        return <div>
                <CommentForm articleId={articleId} />
                {body}
            </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
    comments: commentsForArticleSelector(state, ownProps),
    loading: loadingCommentsSelector(state, ownProps),
    loaded: loadedCommentsSelector(state, ownProps)
})

const mapDispathToProps = dispath => ({
    fetchData: articleId => dispath(loadCommentsForArticle(articleId))
})

export default connect(
    mapStateToProps,
    mapDispathToProps
)(toggleOpen(CommentList))
