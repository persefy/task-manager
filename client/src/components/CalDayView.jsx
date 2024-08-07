function CalDayView() {

    return (
      <>
        <section>
          <h3>[Day]</h3>
          {/*
            - vertical scroll to see other days of week
          */}
          <div className="day-view">
            <div className="cal-row-0">
              <div>Sun</div>
            </div>
            <div className="cal-row-1">
              <div></div>
            </div>
          </div>
        </section>
      </>
    )
  }
  
  export default CalDayView