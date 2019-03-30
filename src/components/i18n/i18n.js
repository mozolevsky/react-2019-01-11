import React from 'react'
import {LangContext} from './LangContext'

export default (Component) => {
    return class i18n extends React.Component {
        render() {
            return (
                <LangContext.Consumer>
                    {dictionary => {
                        console.log(dictionary)
                        return (
                            <Component {...this.props} t={key => dictionary[key]} />
                        )
                    }}
                </LangContext.Consumer>
            )
        }
    }
}