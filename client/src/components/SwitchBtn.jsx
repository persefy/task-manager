import { Link } from 'react-router-dom'

function SwitchBtn() {

  return (
    <div className='switch-button'>
        <Link to="/tasks">Tasks </Link>
        <Link to="/calendar">Calendar </Link>
    </div>
  )
}

export default SwitchBtn