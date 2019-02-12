import React, {PureComponent} from 'react'
import CommentList, {TypeComments} from '../comment-list/comment-list';
import PropTypes from 'prop-types';
import CSSTransition from 'react-addons-css-transition-group'
import './article.css';
import {connect} from 'react-redux';
import {deleteArticle, loadArticle} from '../../ac';
import Loader from '../common/loader';
import {articleSelector} from '../../selectors'
import i18n from '../i18n';

export const TypeArticle = PropTypes.shape({
    id: PropTypes.string,

    // connect
    title: PropTypes.string,
    text: PropTypes.string,
    comments: TypeComments
})

class Article extends PureComponent {
    state = {
        error: null
    }
    componentDidCatch(error) {
        this.setState({error})
    }
    componentDidMount() {
        const {loadArticle, article, id} = this.props
        if (!article || (!article.text && !article.loading)) {
            loadArticle(id)
        }
    }
    render() {
        const {article, t} = this.props
        if (!article) return null
        return (
            <div>
                <h3>
                    {article.title}
                    <button onClick={this.handleDelete}>{t('delete me')}</button>
                </h3>
                <CSSTransition
                    transitionName="article"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {article.loading ? <Loader key="loader" /> : this.body}
                </CSSTransition>
            </div>
        )
    }

    handleDelete = () => {
        this.props.dispatchDeleteArticle(this.props.article.id)
    }

    get body() {
        const {article} = this.props
        return (
            <section className="test--article_body" key="body">
                <p>{article.text}</p>
                {
                    this.state.error ?
                        null :
                        <CommentList article={article} />
                }
            </section>
        )
    }
}

Article.propTypes = {
    article: TypeArticle
}

export default connect(
    (state, ownProps) => ({
        article: articleSelector(state, ownProps)
    }),
    (dispatch) => ({
        dispatchDeleteArticle: (id) => dispatch(deleteArticle(id)),
        loadArticle: (id) => dispatch(loadArticle(id))
    })
)(i18n(Article))
