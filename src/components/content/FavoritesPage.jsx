import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext.jsx';
import { RecipeCard } from './RecipeCard.jsx';

export const FavoritesPage = () => {
    const { recipes = [], favorites = [] } = useContext(RecipeContext);

    const favSet = new Set(favorites.map(String));
    const favRecipes = recipes.filter(r => favSet.has(String(r._id)));

    if (!favRecipes || favRecipes.length === 0) return (
        <div style={{ padding: 20 }}>
            <h2>Your Favorites</h2>
            <div>No favorited recipes yet.</div>
        </div>
    );

    return (
        <div style={{ padding: 20 }}>
            <h2>Your Favorites</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
                {favRecipes.map(r => (
                    <RecipeCard key={r._id} recipe={r} />
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;
