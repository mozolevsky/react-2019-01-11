import React, { Component as ReactComponent } from 'react'
import { Consumer } from './context'

export default (Component) =>
    class Translate extends ReactComponent {
        render() {
            return (
                <Consumer>
                    {(dictionary) => (
                        <Component {...this.props} t={this.createTranslate(dictionary)} />
                    )}
                </Consumer>
            )
        }

        createTranslate = (dictionary) => (text) => dictionary[text] || text
    }
