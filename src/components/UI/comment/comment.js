import React from 'react';
import PropTypes from 'prop-types';

export const comment = props => {
    const {user, text} = props.comment
        return (
            <div>
                <h4>{user}</h4>
                <p>{text}</p>
            </div>
        )
}

comment.propTypes = PropTypes.shape({
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
})