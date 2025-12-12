import React, { useContext } from 'react';
import { useParams, Link } from 'react-router';
import { RecipeContext } from '../context/RecipeContext.jsx';

export const RecipePage = () => {
    const { id } = useParams();
    const { recipes, loading, toggleFavorite, isFavorite } = useContext(RecipeContext);

    if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

    const recipe = (recipes || []).find(r => String(r._id) === String(id));

    if (!recipe) {
        return (
            <div style={{ padding: 20 }}>
                <h3>Recipe not found</h3>
                <Link to="/">Back to home</Link>
            </div>
        );
    }

    const favorited = isFavorite ? isFavorite(recipe._id) : false;

    const handleToggleFav = () => {
        if (toggleFavorite) toggleFavorite(recipe._id);
    };

    return (
        <div style={{ padding: 20 }}>
            <Link to="/">← Back</Link>
            <h2 style={{ marginTop: 8 }}>{recipe.name}</h2>
            <div style={{ margin: '12px 0' }}>
                {favorited ? (
                    <button onClick={handleToggleFav} style={{ padding: '8px 16px', background: '#ffe066', border: '1px solid #ffd700', borderRadius: 4, cursor: 'pointer' }}>
                        Remove from Favorites
                    </button>
                ) : (
                    <button onClick={handleToggleFav} style={{ padding: '8px 16px', background: '#fffbe6', border: '1px solid #ffd700', borderRadius: 4, cursor: 'pointer' }}>
                        Add to Favorites
                    </button>
                )}
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 12 }}>
                <img src={recipe.thumbnail} alt={recipe.name} style={{ width: 320, borderRadius: 8 }} />
                <div>
                    <div style={{ color: '#666' }}>{recipe.category} — {recipe.area}</div>
                    {recipe.tags && recipe.tags.length > 0 && (
                        <div style={{ marginTop: 8 }}>
                            <strong>Tags:</strong> {recipe.tags.join(', ')}
                        </div>
                    )}

                    <div style={{ marginTop: 12 }}>
                        <strong>Ingredients</strong>
                        <ul>
                            {(recipe.ingredients || []).map((ing, idx) => (
                                <li key={idx}>{ing[0]} — {ing[1]}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 20 }}>
                <h3>Instructions</h3>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{recipe.instructions}</pre>
            </div>
        </div>
    );
};

export default RecipePage;
