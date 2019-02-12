import React from 'react'
import i18n from '../i18n'

function Loader({t}) {
    return (
        <h3>{t('Loading') + '...'}</h3>
    )
}

export default i18n(Loader)
