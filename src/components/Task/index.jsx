import { Component } from "react"

export default class Task extends Component {

    render () {
        const { label, time, 
            onDeleted, complited, 
            onToggleDone } = this.props

        return (
            <li className={ complited ? 'completed' : ''}>
            <div className="view">
            <input 
                className="toggle" 
                type="checkbox" 
                checked={complited} 
                onChange={ onToggleDone } 
            />
            <label onClick={ onToggleDone } >
                <span className="description">{label}</span>
                <span className="created">{time}</span>
            </label>
            <button className="icon icon-edit"></button>
            <button 
                onClick={ onDeleted }
                className="icon icon-destroy"></button>
            </div>
        </li>
    )}
}
