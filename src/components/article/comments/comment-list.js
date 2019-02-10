import React, { Component } from 'react'
import toggleOpen from '../../../decorators/toggleOpen'
import ArticleComment from './comment'
import PropTypes from 'prop-types';
import CSSTransition from 'react-addons-css-transition-group'
import './comment-list.css';
import CommentForm from '../../comment-form';
import {connect} from 'react-redux'
import {loadArticleComments} from '../../../ac';
import {List, Loader} from '../../UI'

export const TypeComments = PropTypes.arrayOf(PropTypes.string)

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object,

        // from decorator
        isOpen: PropTypes.bool,
        toggleOpenItem: PropTypes.func.isRequired
    }

    static defaultProps = {
        comments: []
    }

    componentDidUpdate(oldProps) {
        const { isOpen, article, loadArticleComments } = this.props
        if (
            isOpen &&
            !oldProps.isOpen &&
            !article.commentsLoading &&
            !article.commentsLoaded
        ) {
            loadArticleComments(article.id)
        }
    }

    render() {
        const { isOpen, toggleOpenItem } = this.props
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
            article: {
                comments = [],
                id: articleId,
                commentsLoading,
                commentsLoaded
            },
            isOpen
        } = this.props

        if (!isOpen) return null;
        if (commentsLoading) return <Loader />
        if (!commentsLoaded) return null

        const body = comments.length ? (
            <List 
                data={comments}
                pathToKey={entity => entity}
                listItemCssClass={'test--comment-list__item'}
                getComponent={entity => <ArticleComment id={entity}/>}
            />
        ) : (
            <h3 className="test--comment-list__empty">No comments yet</h3>
        )
        return <div>
            <CommentForm articleId={articleId} />
            {body}
        </div>
    }
}

export default connect(
    null,
    {loadArticleComments}
)(toggleOpen(CommentList))
