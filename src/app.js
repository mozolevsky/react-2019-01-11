import React, { Component } from 'react';
import ArticlesPage from './routes/articles';
import CommentsPage from './routes/comments';
import UserForm from './components/user-form/user-form';
import Filters from './components/filters';
import Counter from './components/counter';
import {PageNotFound} from './components/UI'
import {Route, NavLink, Switch} from 'react-router-dom';

const activeLinkStyle = {color: 'red'}

class App extends Component {
    render() {
        return (
            <div>
                <UserForm/>
                <div>
                    <NavLink to={'/counter'} activeStyle={activeLinkStyle}>Counter</NavLink>
                </div>
                <div>
                    <NavLink to={'/filters'} activeStyle={activeLinkStyle}>Filters</NavLink>
                </div>
                <div>
                    <NavLink to={'/articles'} activeStyle={activeLinkStyle}>Articles</NavLink>
                </div>
                <div>
                    <NavLink to={'/comments'} activeStyle={activeLinkStyle}>Comments</NavLink>
                </div>
                <Switch>
                    <Route path={"/counter"} component={Counter}/>
                    <Route path={"/filters"} component={Filters}/>
                    <Route path={"/articles/new"} render={() => <h1>New article form</h1>}/>
                    <Route path={"/articles"} component={ArticlesPage}/>
                    <Route path={"/comments"} component={CommentsPage}/>
                    <Route path={"/:other"} component={PageNotFound}/>
                </Switch>
            </div>
        );
    }
}

export default App;
