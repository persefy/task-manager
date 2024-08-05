import { Link } from 'react-router-dom'
import { useEffect, useContext } from "react"
import DataContext  from "../DataContext.jsx"

function SwitchBtn() {
  const { switchBtnDisplay, setSwitchBtnDisplay } = useContext(DataContext)
  
  useEffect(() => {

    let taskDisplay = document.querySelector('.switch-to-cal')
    let calendarDisplay = document.querySelector('.switch-to-tasks')

		const toggleSwitchBtn = () => {
      if (switchBtnDisplay.display=='calendar') {
        taskDisplay.classList.remove('hide')
        calendarDisplay.classList.add('hide')
      }
      else if (switchBtnDisplay.display=='tasks') {
        taskDisplay.classList.add('hide')
        calendarDisplay.classList.remove('hide')
      } else {
        console.log('Check toggle SwitchBtn code')
      }
		}
    console.log(switchBtnDisplay)
      toggleSwitchBtn()
  }, [switchBtnDisplay])

  return (
    // <div className='switch-btn-wrapper'>
      <div className='switch-button'>
          <div className='toggle-switch-button switch-to-cal'><Link to="/tasks">Tasks </Link></div>
          <div className='toggle-switch-button switch-to-tasks'><Link to="/calendar">Calendar </Link></div>
      </div>
    // </div>
  )
}

export default SwitchBtn