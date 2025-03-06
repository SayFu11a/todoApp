import { Component, createRef } from 'react';
import { formatDistanceStrict } from 'date-fns';

import PropTypes from 'prop-types';
import Timer from '../Timer';

export default class Task extends Component {
    state = {
        newLabel: this.props.label,
    };

    inputRef = createRef();

    static defaultProps = {
        label: '(без заголовка)',
        // onDeleted: () => console.log('нету функции удаления')
    };

    static propTypes = {
        label: PropTypes.number,
        onDeleted: PropTypes.func,
        onEditing: PropTypes.func,
        complited: PropTypes.bool,
        editing: PropTypes.bool,
        onToggleDone: PropTypes.func,
        createdDate: PropTypes.instanceOf(Date),
        min: PropTypes.number,
        sec: PropTypes.number,
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) {
            this.inputRef.current.focus();
            this.inputRef.current.select();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleClickOutside = (event) => {
        // Если мы в режиме редактирования и клик произошёл вне input, то выходим из режима редактирования
        if (this.props.editing && this.inputRef.current && !this.inputRef.current.contains(event.target)) {
            this.setState({ newLabel: this.props.label });
            this.props.onEditing(this.props.id);
        }
    };

    handleKeyDown = (event) => {
        if (this.props.editing && (event.key === 'Escape' || event.keyCode === 27)) {
            // Сброс значения к оригинальному, если редактирование отменяется
            this.setState({ newLabel: this.props.label });
            this.props.onEditing(this.props.id);
        }
    };

    labelEditeHandler = (e) => {
        this.setState({
            newLabel: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onEditLabel(this.state.newLabel, this.props.id);
        this.props.onEditing(this.props.id);
    };

    render() {
        const customPropTypes = (propName, propsValue, type) => {
            if (typeof propsValue !== type) {
                throw new Error(`Invalid prop types: ${propName} and ${propsValue} must be ${type}.`);
            }
        };

        const { label, onDeleted, complited, editing, onToggleDone, onEditing, createdDate, min, sec, id } = this.props;

        customPropTypes('label', label, 'string');

        return (
            <li className={complited ? 'completed' : ''}>
                <div className="view">
                    {editing ? (
                        <form onSubmit={this.onSubmit}>
                            <input
                                ref={this.inputRef}
                                className="edit-input"
                                value={this.state.newLabel}
                                onChange={this.labelEditeHandler}
                            />
                        </form>
                    ) : (
                        <>
                            <input className="toggle" type="checkbox" checked={complited} onChange={onToggleDone} />
                            <label>
                                {/* label */}
                                {/* onClick={onToggleDone} */}
                                <span className="title" onClick={onToggleDone}>
                                    {this.state.newLabel}
                                </span>

                                <Timer min={min} sec={sec} id={id} />

                                <span className="description">
                                    {formatDistanceStrict(createdDate, new Date(), {
                                        addSuffix: true,
                                    })}
                                </span>
                            </label>
                            <button className="icon icon-edit" onClick={onEditing}></button>
                            <button onClick={onDeleted} className="icon icon-destroy"></button>
                        </>
                    )}
                </div>
            </li>
        );
    }
}
