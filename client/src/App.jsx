import React, { useEffect, useState } from 'react'
import WeatherComponent from './components/WeatherComponent'

function App() {

  // const [backendData, setBackendData] = useState([{}])

  // useEffect(() => {
  //   fetch("/api").then(
  //     response => response.json()
  //   ).then(
  //     data => { setBackendData(data) }
  //   )
  // }, [])

  return (
    <div className="App">
      <WeatherComponent />
    </div>
  )
}

export default App;