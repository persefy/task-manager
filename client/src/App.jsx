import { useState,useContext } from 'react'
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import DataContext  from "./DataContext";
import 'semantic-ui-css/semantic.min.css'

import './App.css'

function App() {
  const [switchBtnDisplay, setSwitchBtnDisplay] = useState ({
    display:'tasks'
  })

  return (
    <>
      <DataContext.Provider value={{switchBtnDisplay, setSwitchBtnDisplay}}>
        <Header/>
        <Main/>
        <Footer/>
      </DataContext.Provider>
    </>
  )
}

export default App
