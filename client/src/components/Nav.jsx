import { Link } from 'react-router-dom'

function Nav() {

  return (
    <>
    <nav>
        <Link to="/tasks">Tasks </Link>
        <Link to="/calendar">Calendar </Link>
        <Link to="/reports">Reports </Link>
        <Link to="/settings">Settings </Link>
        
    </nav>
    </>
  )
}

export default Nav