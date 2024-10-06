import CalDayView from "./CalDayView"
function CalWeekView() {

    return (
      <>
        <section>
          <h3>[Week]</h3>
          {/*
            - horizontal scroll through week, showing 2-4 days at a time, based on screen width
          */}   

          {/* <div className="week-view">
            <div className="cal-row-0">
              <div>Sun</div>
              <div>Mon</div>
            </div>
            <div className="cal-row-1">
              <div></div>
              <div></div>
            </div>
          </div> */}
          <div className="week-view">
            <div><CalDayView/></div>
            <div><CalDayView/></div>
          </div>
        </section>
      </>
    )
  }
  
  export default CalWeekView