import { Component } from 'react';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
    state = {
        label: '',
        min: '',
        sec: '',
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        });
    };

    onMinChange = (e) => {
        this.setState({
            min: e.target.value,
        });
    };

    onSecChange = (e) => {
        this.setState({
            sec: e.target.value,
        });
    };

    onSubmit = (e) => {
        console.log('onSubmit');

        e.preventDefault();
        this.props.onAdded(this.state.label, this.state.min, this.state.sec);
        this.setState({
            label: '',
            min: '',
            sec: '',
        });
    };

    render() {
        return (
            <form className="new-todo-form" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    value={this.state.label} // контролируемый value
                    onChange={this.onLabelChange}
                    className="new-todo"
                    placeholder="Task"
                    autoFocus
                />
                <input
                    className="new-todo-form__timer"
                    placeholder="Min"
                    autoFocus
                    value={this.state.min}
                    onChange={this.onMinChange}
                />
                <input
                    className="new-todo-form__timer"
                    placeholder="Sec"
                    autoFocus
                    value={this.state.sec}
                    onChange={this.onSecChange}
                />
                <input type="submit" style={{ display: 'none' }} />
            </form>
        );
    }
}
