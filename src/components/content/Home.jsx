
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeSearchBar } from './RecipeSearchBar.jsx';
import { IngredientBasket } from './IngredientBasket.jsx';
import { RecipeSearchResult } from './RecipeSearchResult.jsx';
import { RecipeAreaDropdown } from './RecipeAreaDropdown.jsx';
import { RecipeContext } from '../context/RecipeContext.jsx';


export const HomePage = () => {
    const { findRecipesByIngredients, basket, addIngredientToBasket, removeIngredientFromBasket, recipes } = useContext(RecipeContext);
    const navigate = useNavigate();

    const handleLucky = () => {
        if (!recipes || recipes.length === 0) return;
        const rand = Math.floor(Math.random() * recipes.length);
        const recipe = recipes[rand];
        if (recipe && recipe._id !== undefined) {
            navigate(`/recipe/${recipe._id}`);
        }
    };
    const [results, setResults] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');

    useEffect(() => {
        let found = findRecipesByIngredients(basket || []);
        if (selectedArea) {
            found = found.filter(r => r.area === selectedArea);
        }
        setResults(found);
    }, [basket, findRecipesByIngredients, selectedArea]);

    return (
        <div>
            <h1 className="centered-title">Recipe Finder</h1>
            <div className="search-controls-row">
                <RecipeSearchBar onAddIngredient={addIngredientToBasket} />
                <RecipeAreaDropdown selectedArea={selectedArea} onChange={setSelectedArea} />
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                    <button type="button" className="btn btn-outline-primary" onClick={handleLucky} title="Go to a random recipe">I'm feeling lucky</button>
                </div>
            </div>
            <div className="basket-row">
                <IngredientBasket basket={basket} onRemove={removeIngredientFromBasket} />
            </div>
            <RecipeSearchResult results={results} />
        </div>
    );
};

