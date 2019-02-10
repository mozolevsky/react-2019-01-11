import React, {Component} from 'react'
import ArticleList from '../components/article-list';
import {Route} from 'react-router-dom';
import Article from '../components/article';
import {Switch} from 'react-router-dom';

class ArticlesPage extends Component {
    render() {
        return (
            <div>
                <ArticleList />
                <Switch>
                    <Route path={'/articles/:id'} render={this.getArticle}/>
                    <Route path={'/articles'} render={() => <h2>Please select an article</h2>}/>
                </Switch>
            </div>
        )
    }

    getArticle = ({match}) => {
         return <Article key={match.params.id} id={match.params.id}/>
    }
}

export default ArticlesPage
