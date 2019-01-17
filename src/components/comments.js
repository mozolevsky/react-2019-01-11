import React, {PureComponent} from 'react'
import commentsHOC from "../decorators/commentsHOC"

class Comments extends PureComponent {
    render() {
        const {isHidden, toggle} = this.props;
        if (!isHidden) {
            return <button onClick={toggle}>open comments</button>
        }

        return (
            <section>
                <button onClick={toggle}>close comments</button>
                {this.comments}
            </section>
        )
    }

    get comments() {
        return this.props.comments.map(({id, user, text}) => (
        <div key={id}>
            <h4>{user}</h4>
            <p>{text}</p>
        </div>
        ))
    }
}

export default commentsHOC(Comments);