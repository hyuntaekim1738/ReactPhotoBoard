import { useState } from 'react'
import './App.css'
//component imports
import Navigation from './components/navigation/Navigation';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      <Navigation authenticated={authenticated}></Navigation>
    </>
  )
}

export default App
