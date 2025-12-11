import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import {HomePage} from './components/content/Home.jsx'
//router
import MainLayout from './components/structural/MainLayout.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
