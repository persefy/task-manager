function CalDayView() {

    let hourMarker = document.getElementsByClassName('hour')

    for (let i = 0; i < hourMarker.length; i++) {
      hourMarker[i].setAttribute('data-value', hourMarker[i].getAttribute("data-hour"));
    }
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
              <div className="content">
                <div className='hour' data-hour='12 AM'></div>
                <div className='hour' data-hour='1 AM'></div>
                <div className='hour' data-hour='2 AM'></div>
                <div className='hour' data-hour='3 AM'></div>
                <div className='hour' data-hour='4 AM'></div>
                <div className='hour' data-hour='5 AM'></div>
                <div className='hour' data-hour='6 AM'></div>
                <div className='hour' data-hour='7 AM'></div>
                <div className='hour' data-hour='8 AM'></div>
                <div className='hour' data-hour='9 AM'></div>
                <div className='hour' data-hour='10 AM'></div>
                <div className='hour' data-hour='11 AM'></div>
                <div className='hour' data-hour='12 PM'></div>
                <div className='hour' data-hour='1 PM'></div>
                <div className='hour' data-hour='2 PM'></div>
                <div className='hour' data-hour='3 PM'></div>
                <div className='hour' data-hour='4 PM'></div>
                <div className='hour' data-hour='5 PM'></div>
                <div className='hour' data-hour='6 PM'></div>
                <div className='hour' data-hour='7 PM'></div>
                <div className='hour' data-hour='8 PM'></div>
                <div className='hour' data-hour='9 PM'></div>
                <div className='hour' data-hour='10 PM'></div>
                <div className='hour' data-hour='11 PM'></div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
  
  export default CalDayView