import { Link } from 'react-router-dom'

function Home() {

  return (
    <>
    <section>
        <ul>
            <li><Link to="/tasks">Tasks </Link></li>
            <li><Link to="/calendar">Calendar </Link></li>
        </ul>
    </section>
    </>
  )
}

export default Home