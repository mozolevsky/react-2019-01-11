import React, {Component} from 'react';

export default CommentsWrapper =>
  class DecoratedComponent extends Component {
      state = {
        isHidden: true
      }

      toggle = () => {
        this.setState({
          isHidden: !this.state.isHidden
        })
      }

      render() {
        return <CommentsWrapper
                    {...this.props}
                    {...this.state}
                    toggle={this.toggle}
                />
      }
  }