import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import {HomePage} from './components/content/Home.jsx'
import RecipePage from './components/content/RecipePage.jsx'
import FavoritesPage from './components/content/FavoritesPage.jsx'
import RecipeOfTheDay from './components/content/RecipeOfTheDay.jsx'
//router
import MainLayout from './components/structural/MainLayout.jsx'
import { RecipeProvider } from './components/context/RecipeContext.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
      <RecipeProvider>
        <BrowserRouter>
          <Routes> 
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="recipe-of-the-day" element={<RecipeOfTheDay />} />
              <Route path="recipe/:id" element={<RecipePage />} />
              <Route path="favorites" element={<FavoritesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecipeProvider>
  )
}

export default App
