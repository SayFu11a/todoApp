import { Component } from "react";
export default class TasksFilter extends Component {
    render() {
        const { fliterHandle, filterPos } = this.props;

        return (
            <ul className="filters">
                <li>
                    <button 
                        onClick={ () => fliterHandle(0) }
                        className={ filterPos == 0 ? 'selected' : ''} >
                        All
                    </button>
                </li>
                <li>
                    <button 
                        onClick={ () => fliterHandle(1) }
                        className={ filterPos == 1 ? 'selected' : ''} >
                        Active
                    </button>
                </li>
                <li>
                    <button 
                        onClick={ () => fliterHandle(2) }
                        className={ filterPos == 2 ? 'selected' : ''} >
                        Completed
                    </button>
                </li>
            </ul>
        )
    }
}
