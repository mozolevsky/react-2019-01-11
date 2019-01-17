// HOC - higher order component
import React, {Component} from 'react';

export default OriginalComponent =>
    class DecoratedComponent extends Component {
        state = {
            openItemId: null
        }

        toggleOpenArticle = id => {
            this.setState(prevState => ({openItemId: id === prevState.openItemId ? null : id}))
        }

        render() {
            return <OriginalComponent
                {...this.props}
                {...this.state}
                toggleOpenArticle={this.toggleOpenArticle}
            />;
        }

    }
