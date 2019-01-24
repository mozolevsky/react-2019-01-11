import React, { Component } from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import {updateFilters} from '../../ac'

class SelectFilter extends Component {
    render() {
        const {onHandleSelectChange, selectedOptions} = this.props

        return (
            <Select
                options={this.optionsForSelect}
                onChange={onHandleSelectChange}
                value={selectedOptions}
                isMulti
            />
        )
    }

    get optionsForSelect() {
        return this.props.articles.map((item) => ({
            value: item.id,
            label: item.title
        }))
    }

    handleSelectChange = selectedOption => {
        this.props.onHandleSelectChange(selectedOption)
    }
}

const mapStateToProps = store => ({
    selectedOptions: store.filters.titles,
    articles: store.articles
})

const mapDispatchToProps = dispatch => ({
    onHandleSelectChange: titles => dispatch(updateFilters({titles}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectFilter)
