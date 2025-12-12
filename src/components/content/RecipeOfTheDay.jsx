import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext.jsx';

// Source - https://stackoverflow.com/a/7616484
// Posted by esmiralha, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-11, License - CC BY-SA 4.0

const hashString = (string) => {
  let hash = 0;
  for (const char of string) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0; // Constrain to 32bit integer
  }
  console.log('Hash for string "', string, '" is ', hash);
  return hash;
};


const RecipeOfTheDay = () => {
  const { recipes, loading } = useContext(RecipeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!recipes || recipes.length === 0) {
      navigate('/');
      return;
    }

    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10); // YYYY-MM-DD
    const seed = hashString(dateStr);
    const idx = Math.abs(seed) % recipes.length;
    const recipe = recipes[idx];

    if (recipe && recipe._id !== undefined) {
      navigate(`/recipe/${recipe._id}`);
    } else {
      // fallback to index-based route if IDs missing
      navigate(`/`);
    }
  }, [loading, recipes, navigate]);

  return <div style={{ padding: 20 }}>Picking today's recipe...</div>;
};

export default RecipeOfTheDay;
