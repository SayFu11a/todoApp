import Task from '../Task'

import  './TaskList.css'

const TaskList = ({ todosArr, onDeleted, onToggleDone, filterPos }) => {

    let filtredTodosArr

    switch (filterPos) {
        case 1:
            filtredTodosArr = todosArr.filter(el => !el.complited)
            break;
        case 2:
            filtredTodosArr = todosArr.filter(el => el.complited)
            break;
        default:
            filtredTodosArr = todosArr
    }

    const elements = filtredTodosArr.map(item => {
        const {id, ...itemProps} = item;

        return (
            <Task 
                key={id} 
                { ...itemProps }
                onDeleted={ () => onDeleted(id) }
                onToggleDone={ () => onToggleDone(id) }
            />
        )
    })

    return (
        <ul className="todo-list">
            { 
                filtredTodosArr.length !== 0 ? elements : 

                <li style={{ textAlign: "center", margin:10 }} >
                    Тут пока ничего нет 😎
                </li> 
            }
        </ul>
    )
}

export default TaskList