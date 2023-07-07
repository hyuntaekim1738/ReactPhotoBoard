import { useState } from 'react'
import './App.css'
//component imports
import Login from './components/Login';
import Navigation from './components/navigation/Navigation';
function App() {
  //const [authenticated, setAuthenticated] = useState(false);

  //this will control login visibility so that by default login renders until navbar is clicked or login successfully submitted
  const [defaultVisible, setDefaultVisible] = useState(true); 
  const handleClickLink = ()=> {
    setDefaultVisible(false);
  };
  
  return (
    <>
      <Navigation onClickLink={handleClickLink} authenticated={false}></Navigation>
      {defaultVisible && <Login></Login>}
    </>
  )
}

export default App
