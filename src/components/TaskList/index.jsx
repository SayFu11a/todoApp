import Task from '../Task'

import  './TaskList.css'

const TaskList = () => {
  const todosArr = [
    { label: 'Drink Coffee', complited: false, time: 'created 17 seconds ago', id: 1 },
    { label: 'Drink Coffee2', complited: true, time: 'created 37 seconds ago', id: 2 },
    { label: 'Drink 333', complited: true, time: 'created 57 seconds ago', id: 3 },

  ]

  const elements = todosArr.map(item => {
    const {id, ...itemProps} = item;

    return <Task key={id} { ...itemProps } />
  })

  return (
    <ul className="todo-list">
      { elements }
    </ul>
  )
}

export default TaskList