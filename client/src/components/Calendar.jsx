import { useEffect, useContext, useState } from "react"
import DataContext  from "../DataContext.jsx"
import CalDayView from "./CalDayView"
import CalWeekView from "./CalWeekView"
import CalMonthView from "./CalMonthView"
import CalYearView from "./CalYearView"
import { Menu, Segment } from "semantic-ui-react"

function Calendar() {
  const { switchBtnDisplay, setSwitchBtnDisplay } = useContext(DataContext);

    const [activeItem, setActiveItem] = useState('Day')
    const [mounted,setMounted] = useState ({
      'Day': true, //set default cal view to true
      'Week': true,
      'Month': false,
      'Year': false,
    })
  
  useEffect(() => {
		const setSwitchBtn = () => {
			setSwitchBtnDisplay({display:'calendar'})
		}
    console.log(switchBtnDisplay)
      setSwitchBtn()
    setMounted(prev => ({...prev, [activeItem]:true}))
    
  }, [activeItem])

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const tabContents = {
    'Day': CalDayView,
    'Week': CalWeekView,
    'Month': CalMonthView,
    'Year': CalYearView,
  }

  const menuItems = ['Day', 'Week', 'Month', 'Year']
  
  return (
    <>
      <h2>Calendar</h2>
      <div>
      <Menu secondary>
        {menuItems.map(item => (
          <Menu.Item
            key={item}
            name={item}
            active={activeItem === item}
            onClick={handleItemClick}
          />
        ))}
      </Menu>
      <Segment>
        {Object.entries(tabContents).map(([tabName, TabComponent]) => (
          mounted[tabName] && (
            <div key={tabName} style={{ display: activeItem === tabName ? 'block' : 'none' }}>
              <TabComponent />
            </div>
          )
        ))}
      </Segment>
    </div>
      
    </>
  )
}

export default Calendar