import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Authh from './pages/Authh'
import Userhome from './pages/Userhome'
import ProfilePage from './pages/ProfilePage'
import Chat from './pages/Chat'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Authh />} />
        <Route path='/register' element={<Authh insideRegister={true} />} />
        <Route path='/userhome' element={<Userhome />} />
        <Route path='/profilepage' element={<ProfilePage />} />
        <Route path='/chats' element={<Chat />} />
      </Routes>

    </>
  )
}

export default App
