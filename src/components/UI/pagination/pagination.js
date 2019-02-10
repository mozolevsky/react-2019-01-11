import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {list as List} from '../list/list'

export const pagination = props => {
    const {
        limit,
        total,
        link,
        wrapperCss,
        listItemCss
    } = props
    let amountOfPages = Math.ceil(total / limit)
    const paginationData = []
    while (amountOfPages > 0) {
        paginationData.push(amountOfPages)
        amountOfPages--
    }

    return (
        paginationData.length > 0 && 
        <section className={wrapperCss}>
            <List 
                data={paginationData}
                pathToKey={entity => entity}
                listItemCss={listItemCss}
                getComponent={entity => <NavLink to={`${link}/${entity}`}>{entity}</NavLink>}
            />
        </section>
    )
}

pagination.propTypes = {
    limit: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    wrapperCss: PropTypes.string,
    listItemCss: PropTypes.string
}
