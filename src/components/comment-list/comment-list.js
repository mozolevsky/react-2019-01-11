import React, { Component } from 'react'
import Comment from '../comment/comment'
import toggleOpen from '../../decorators/toggleOpen'
import PropTypes from 'prop-types';
import CSSTransition from 'react-addons-css-transition-group'
import './comment-list.css';
import CommentForm from '../comment-form';
import {connect} from 'react-redux'
import Loader from '../common/loader';
import {loadArticleComments} from '../../ac';
import {Consumer as AuthConsumer} from '../../contexts/auth';
import i18n from '../i18n';

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
        const { isOpen, toggleOpenItem, t} = this.props
        return (
            <div>
                <button onClick={toggleOpenItem} className="test--comment-list__btn">
                    {t(isOpen ? 'hide comments' : 'show comments')}
                </button>
                <AuthConsumer>
                    {(contextValue) => (<h3>{contextValue.contextUserName}</h3>)}
                </AuthConsumer>
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
            isOpen,
            t
        } = this.props

        if (!isOpen) return null;
        if (commentsLoading) return <Loader />
        if (!commentsLoaded) return null

        const body = comments.length ? (
            <ul>
                {comments.map((id) => (
                    <li key={id} className="test--comment-list__item">
                        <Comment id={id} />
                    </li>
                ))}
            </ul>
        ) : (
            <h3 className="test--comment-list__empty">{t('No comments yet')}</h3>
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
)(toggleOpen(i18n(CommentList)))
