import { Component } from "react";

import './NewTaskForm.css'

export default class NewTaskForm extends Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onAdded(this.state.label)
        this.setState({
            label: '',
        });
    }

    render() {
        return (
            <form onSubmit={ this.onSubmit } >
                <input
                    type="text"
                    value={this.state.label} // контролируемый value
                    onChange={this.onLabelChange}
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                />
            </form>
        )
    }
}
