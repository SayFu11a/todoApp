import { Component } from "react"

export default class Task extends Component {

    state = {
        complited: false,
    }

    onLiClick = () => {
        this.setState( (state) => {
            return { 
                complited: !state.complited
            }
        })
    }

    onMarkImportant = () => {
        this.setState((state) =>{
            return {
                important: !state.important
            }
        })
    }


    render () {
        const { label, time, onDeleted } = this.props
        const { complited } = this.state


        return (
            <li className={ complited ? 'completed' : ''}>
            <div className="view">
            <input 
                className="toggle" 
                type="checkbox" 
                checked={complited} 
                onChange={ this.onLiClick } 
            />
            <label onClick={ this.onLiClick } >
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
