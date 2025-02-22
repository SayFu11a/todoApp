import { Component } from 'react';

import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
    static propTypes = {
        fliterHandle: PropTypes.func,
        filterPos: PropTypes.number,
    };

    render() {
        const { fliterHandle, filterPos } = this.props;

        return (
            <ul className="filters">
                <li>
                    <button onClick={() => fliterHandle(0)} className={filterPos == 0 ? 'selected' : ''}>
                        All
                    </button>
                </li>
                <li>
                    <button onClick={() => fliterHandle(1)} className={filterPos == 1 ? 'selected' : ''}>
                        Active
                    </button>
                </li>
                <li>
                    <button onClick={() => fliterHandle(2)} className={filterPos == 2 ? 'selected' : ''}>
                        Completed
                    </button>
                </li>
            </ul>
        );
    }
}
