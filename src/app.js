import React, { Component } from 'react';
import ArticleList from './components/article-list';
import UserForm from './components/user-form';
import Select from 'react-select';
import DataRange from './components/date-range'

class App extends Component {
    state = {
        selected: null
    }
    render() {
        return (
        <div>
            <DataRange />
            <UserForm/>
            <Select
                options={this.options}
                isMulti={true}
                value={this.state.selected}
                onChange={this.handleSelectChange}
            />
            <ArticleList
                articles={this.props.articles}
            />
        </div>
        )
    }

    handleSelectChange = (selected) => this.setState({selected})

    get options() {
        return this.props.articles.map(article => ({
            value: article.id,
            label: article.title
        }))
    }
}

export default App;
