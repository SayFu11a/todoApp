

const Task = ({label, complited, time}) => {
  return (
    <li>
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">{label}</span>
        <span className="created">{time}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  </li>
  )
}

export default Task