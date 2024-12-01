import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Authh from './pages/Authh'
import Userhome from './pages/Userhome'
import { StateProvider } from './ContextApi/StateContext'

function App() {


  return (
    <>
      <StateProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Authh />} />
          <Route path='/register' element={<Authh insideRegister={true} />} />
          <Route path='/userhome' element={<Userhome />} />
        </Routes>
      </StateProvider>
    </>
  )
}

export default App
