import React, {Component} from 'react'
import CommentsArea from '../components/comments/commentsArea';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';

class CommentsPage extends Component {
    getComments = ({match}) => {
        return <CommentsArea key={match.params.id} pageNumber={match.params.id || 1}/>
   }

    render() {
        return (
            <div>
                <h1>Comments page</h1>
                <Switch>
                    <Route path={'/comments/:id'} render={this.getComments} exact/>
                    <Route path={'/comments/'} render={this.getComments} exact/>
                </Switch>
            </div>
        )
    }
}

export default CommentsPage
