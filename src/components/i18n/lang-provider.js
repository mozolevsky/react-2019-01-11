import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dictionaries from '../../dictionaries'
import { Provider } from './context'

class LangProvider extends Component {
    static propTypes = {
        language: PropTypes.string
    }

    render() {
        return (
            <Provider value={dictionaries[this.props.language]}>
                {this.props.children}
            </Provider>
        )
    }
}

export default LangProvider
