import React from 'react';
import PropTypes from 'prop-types'

/**
 * Abstraction for representing any iterable list
 */
export const list = props => {
    const {data = [], pathToKey, listItemCss, getComponent} = props

    return (
        <ul>
            {data.map(entity => (
                <li key={pathToKey(entity)} className={listItemCss}>
                    {getComponent(entity)}
                </li>
            ))}
        </ul>
    )
}

list.defaultProps = {
    data: [],
    pathToKey: () => null,
    getComponent: () => null
}

list.propTypes = PropTypes.shape({
    data: PropTypes.array,
    pathToKey: PropTypes.func.isRequired,
    getComponent: PropTypes.func.isRequired,
    listItemCssClass: PropTypes.string
})
