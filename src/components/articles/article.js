import React, {PureComponent} from 'react'
import CommentList from '../comments/comment-list'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import {articleType} from '../../types'
import './article.css'

class Article extends PureComponent {
    state = {
        error: null
    }

    componentDidCatch(error) {
        this.setState({error})
    }
    
    render() {
        const {article: {title}, isOpen} = this.props
        return (
            <div>
                <h3>
                    {title}
                    <button className='test--article__btn' onClick={this.toggleOpen}>
                        {isOpen ? 'close' : 'open'}
                    </button>
                </h3>
                <CSSTransition
                    transitionName='article'
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {this.body}
                </CSSTransition>
            </div>
        )
    }

    toggleOpen = () => this.props.toggleArticle(this.props.article.id)

    get body() {
        const {article, isOpen} = this.props
        return (
            isOpen &&
            <section className='test--article_body'>
                <p>{article.text}</p>
                {!this.state.error && <CommentList comments={article.comments} />}
            </section>
        )
    }
}

Article.propTypes = {
    isOpen: PropTypes.bool,
    toggleArticle: PropTypes.func,
    article: articleType
}

export default Article
