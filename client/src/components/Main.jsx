import Home from "./Home"
import Tasks from "./Tasks"
import Calendar from "./Calendar"
import Reports from "./Reports"
import Settings from "./Settings"
import { Route, Routes } from 'react-router-dom'

function Main() {

  return (
    <>
      <Routes>
        <Route exact path ="/" element ={<Home/>} />
        <Route exact path ="/tasks" element ={<Tasks/>} /> 
        <Route exact path ="/calendar" element ={<Calendar/>} />    
        <Route exact path ="/reports" element ={<Reports/>} /> 
        <Route exact path ="/settings" element ={<Settings/>} /> 
      </Routes>
    </>
  )
}

export default Main