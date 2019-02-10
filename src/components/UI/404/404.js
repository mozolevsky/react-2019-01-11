import React from 'react';
import {Link} from 'react-router-dom';

export const pageNotFound = () => (
    <section>
        <h1>Page not found</h1>
        <p>Return to the 
            <Link to='/'> main page</Link>
        </p>
    </section>
)
