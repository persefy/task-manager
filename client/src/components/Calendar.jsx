import { useEffect, useContext } from "react"
import DataContext  from "../DataContext.jsx"
import CalDayView from "./CalDayView"
import CalWeekView from "./CalWeekView"
import CalMonthView from "./CalMonthView"
import CalYearView from "./CalYearView"

function Calendar() {
  const { switchBtnDisplay, setSwitchBtnDisplay } = useContext(DataContext);

  useEffect(() => {
		const setSwitchBtn = () => {
			setSwitchBtnDisplay({display:'calendar'})
		}
    console.log(switchBtnDisplay)
      setSwitchBtn()
  }, [])

  return (
    <>
      <h2>Calendar</h2>
      <CalDayView/>
      <CalWeekView/>
      <CalMonthView/>
      <CalYearView/>
    </>
  )
}

export default Calendar