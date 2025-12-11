import React, { createContext, useState, useEffect } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            setRecipes(data.recipes);
        })
        .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes }}>
      {children}
    </RecipeContext.Provider>
  );
};
