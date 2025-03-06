import { Component } from 'react';
import { formatDistanceStrict } from 'date-fns';

import PropTypes from 'prop-types';
import Timer from '../Timer';

export default class Task extends Component {
    static defaultProps = {
        label: '(без заголовка)',
        // onDeleted: () => console.log('нету функции удаления')
    };

    static propTypes = {
        label: PropTypes.number,
        onDeleted: PropTypes.func,
        complited: PropTypes.bool,
        onToggleDone: PropTypes.func,
        createdDate: PropTypes.instanceOf(Date),
        min: PropTypes.number,
        sec: PropTypes.number,
    };

    render() {
        const customPropTypes = (propName, propsValue, type) => {
            if (typeof propsValue !== type) {
                throw new Error(`Invalid prop types: ${propName} and ${propsValue} must be ${type}.`);
            }
        };

        const { label, onDeleted, complited, onToggleDone, createdDate, min, sec, id } = this.props;

        customPropTypes('label', label, 'string');

        return (
            <li className={complited ? 'completed' : ''}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={complited} onChange={onToggleDone} />
                    <label>
                        {/* label */}
                        {/* onClick={onToggleDone} */}
                        <span className="title" onClick={onToggleDone}>
                            {label}
                        </span>

                        <Timer min={min} sec={sec} id={id} />

                        <span className="description">
                            {formatDistanceStrict(createdDate, new Date(), {
                                addSuffix: true,
                            })}
                        </span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button onClick={onDeleted} className="icon icon-destroy"></button>
                </div>
            </li>
        );
    }
}
