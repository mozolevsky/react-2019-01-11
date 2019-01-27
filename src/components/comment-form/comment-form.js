import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addComment} from '../../ac'
import PropTypes from 'prop-types'
import './comment-form.css'

class CommentForm extends Component {
    state = {
        user: '',
        text: ''
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const {articleId} = this.props
        this.props.dispatchAddComment({...this.state, articleId})
    }

    render() {
        const {user, text} = this.state
        return (
            <form onSubmit={this.handleSubmit} className='commentForm'>
                <input 
                    type='text' 
                    name='user' 
                    value={user}
                    onChange={this.handleChange} 
                    className='commentForm__field'/>
                <textarea 
                    name='text' 
                    value={text}
                    onChange={this.handleChange} 
                    className='commentForm__textarea'/>
                <input 
                    type='submit' 
                    value='Add comment' 
                    className='commentForm__field'/>
            </form>
        )
    }
}

CommentForm.propTypes = {
    articleId: PropTypes.string.isRequired
}

const mapDispatchToProps = dispatch => ({
    dispatchAddComment: comment => dispatch(addComment(comment))
})

export default connect(
    null,
    mapDispatchToProps
)(CommentForm)