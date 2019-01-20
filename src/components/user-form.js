import React, {Component} from 'react'

class UserForm extends Component {
    state = {
        user: ''
    }

    render() {
        return (
            <div>
                Username:
                <input value={this.state.user} onChange={this.handleChange}/>
            </div>
        )
    }

    handleChange = event => {
        event.preventDefault()
        const {value} = event.target
        this.setState(() => ({user: value.length > 10 ? '' : value}))
    }
}

export default UserForm
