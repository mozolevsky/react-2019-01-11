import React from 'react'
import {en, ru} from '../../dictionaries'
import {LangContext} from './LangContext'

export class LangProvider extends React.Component {
    render() {
        const {language, children} = this.props
        return (
            <LangContext.Provider dictionary={language === 'en' ? en : ru}>
                {children}
            </LangContext.Provider>
        )
    }
}