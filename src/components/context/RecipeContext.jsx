import React, { createContext, useState, useEffect, useCallback } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]); // array of ingredient names
  const [ingredientLookup, setIngredientLookup] = useState({}); // mapping name -> array of recipe indices
  const [basket, setBasket] = useState([]); // selected ingredients
  const [favorites, setFavorites] = useState([]); // array of recipe _id (numbers or strings)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // fetch ingredients and recipes from the public folder
    Promise.all([
      fetch('/ingredients.json').then(res => res.json()),
      fetch('/recipes.json').then(res => res.json())
    ])
      .then(([ingData, recipesData]) => {
        setIngredients(Object.keys(ingData));
        setIngredientLookup(ingData);
        setRecipes(recipesData || []);
      })
      .catch(err => console.error('Error fetching recipe data:', err))
      .finally(() => setLoading(false));
  }, []);

  // returns array of recipe objects that contain ALL ingredients in `basket`
  const findRecipesByIngredients = useCallback((basket) => {
    if (!basket || basket.length === 0) return [];
    const allIndices = basket.map(ingredient => ingredientLookup[ingredient] || []);
    if (allIndices.length === 0) return [];
    let common = allIndices[0];
    for (let i = 1; i < allIndices.length; i++) {
      common = common.filter(idx => allIndices[i].includes(idx));
    }
    const uniqueCommon = Array.from(new Set(common)).sort((a, b) => a - b);
    return uniqueCommon.map(idx => recipes[idx]).filter(Boolean);
  }, [ingredientLookup, recipes]);

  const addIngredientToBasket = useCallback((ingredient) => {
    setBasket(prev => {
      if (!ingredient) return prev;
      if (prev.includes(ingredient)) return prev;
      return [...prev, ingredient];
    });
  }, []);

  const removeIngredientFromBasket = useCallback((ingredient) => {
    setBasket(prev => prev.filter(i => i !== ingredient));
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('favorites');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setFavorites(parsed);
      }
    } catch (err) {
      console.error('Failed to load favorites from localStorage', err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage', err);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => {
      const sid = String(id);
      if (prev.map(String).includes(sid)) {
        return prev.filter(f => String(f) !== sid);
      }
      return [...prev, id];
    });
  }, []);

  const isFavorite = useCallback((id) => {
    const sid = String(id);
    return favorites.map(String).includes(sid);
  }, [favorites]);

  return (
    <RecipeContext.Provider value={{
      recipes,
      ingredients,
      ingredientLookup,
      findRecipesByIngredients,
      loading,
      // basket state and helpers
      basket,
      addIngredientToBasket,
      removeIngredientFromBasket,
      // favorites
      favorites,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </RecipeContext.Provider>
  );
};
