import CalDayView from "./CalDayView"
import CalWeekView from "./CalWeekView"
import CalMonthView from "./CalMonthView"
import CalYearView from "./CalYearView"

function Calendar() {

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