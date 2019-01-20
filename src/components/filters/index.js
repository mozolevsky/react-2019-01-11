import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Select from './select'
import DateRange from './date-range-picker'
import {articleType} from '../../types'

class Filters extends Component {
    render() {
        return (
            <div>
                <Select articles={this.props.articles} />
                <DateRange />
            </div>
        )
    }
}

Filters.propTypes = {
    articles: PropTypes.arrayOf(articleType)
}

export default Filters
