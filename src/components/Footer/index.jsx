import TasksFilter from "../TasksFilter"

import "./Footer.css"

const Footer = ({ fliterHandle, filterPos, cleareCompleted, todosArr }) => {
    const activeTodoCount = todosArr.filter(el => !el.complited).length

    return (
        <footer className="footer">
            <span className="todo-count">{ activeTodoCount } items left</span>
            <TasksFilter 
                fliterHandle={ fliterHandle }
                filterPos={ filterPos }
            />
            <button 
                onClick={ cleareCompleted }
                className="clear-completed">Clear completed</button>
        </footer>
    )
}

export default Footer