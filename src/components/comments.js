import React, {PureComponent} from 'react'
import commentsHOC from "../decorators/commentsHOC"

class Comments extends PureComponent {
    render() {
        const {isHidden, toggle} = this.props
        const toggleBtn = <button onClick={toggle}>{isHidden ? 'open ' : 'close '}comments</button>

        return isHidden ? toggleBtn : (
            <section>
                {toggleBtn}
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