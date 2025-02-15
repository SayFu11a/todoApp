import Task from '../Task'

import  './TaskList.css'

const TaskList = ({ todosArr, onDeleted }) => {
    const elements = todosArr.map(item => {
        const {id, ...itemProps} = item;

        return (
            <Task 
                key={id} 
                { ...itemProps }
                onDeleted={ () => onDeleted(id) }/>
        )
    })

    return (
        <ul className="todo-list">
            { elements }
        </ul>
    )
}

export default TaskList