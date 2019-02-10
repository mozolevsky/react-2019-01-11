import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadComments} from '../../ac'
import {Pagination, List, Comment, Loader} from '../UI'
import {
    pageCommentsSelector,
    pageCommentsLoadingSelector,
    pageCommentsLoadedSelector
} from '../../selectors'

class CommentsArea extends Component {
    state = {
        limit: 5
    }

    componentDidMount() {
        if (!this.props.comments) {
            this.props.loadComments(this.props.pageNumber, this.state.limit)
        }
    }

    renderComments = () => {
        const {loaded, total, comments} = this.props
        return loaded && (
            <>
                <List 
                    data={comments}
                    pathToKey={comment => comment.id}
                    getComponent={comment => <Comment comment={comment}/>}
                />
                <Pagination 
                    limit={this.state.limit}
                    total={total}
                    link={'/comments'}
                />
            </>
        )
    }

    renderCommentsArea = () => {
        return this.props.loading ? <Loader /> : this.renderComments()
    }

    render() {
        return (
            <>
                <h3>List of commetns</h3>
                {this.renderCommentsArea()}
            </>
        )
        
    }
}

const mapStateToProps = (store, ownProps) => {
    const getPageComments = pageCommentsSelector()
    const getLoadingStatus = pageCommentsLoadingSelector()
    const getLoadedStatus = pageCommentsLoadedSelector()
    return {
        total: store.allComments.total,
        comments: getPageComments(store, ownProps),
        loading: getLoadingStatus(store, ownProps),
        loaded: getLoadedStatus(store, ownProps)
    }
}

const mapDispatchToProps = dispatch => ({
    loadComments: (currentPage, limit) => dispatch(loadComments(currentPage, limit)) 
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentsArea)