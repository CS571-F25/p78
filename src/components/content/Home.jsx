
import React, { useContext, useEffect, useState } from 'react';
import { RecipeSearchBar } from './RecipeSearchBar.jsx';
import { IngredientBasket } from './IngredientBasket.jsx';
import { RecipeSearchResult } from './RecipeSearchResult.jsx';
import { RecipeAreaDropdown } from './RecipeAreaDropdown.jsx';
import { RecipeContext } from '../context/RecipeContext.jsx';


export const HomePage = () => {
    const { findRecipesByIngredients, basket, addIngredientToBasket, removeIngredientFromBasket, recipes } = useContext(RecipeContext);
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
            <h1>Welcome to the Recipe App</h1>
            <RecipeAreaDropdown selectedArea={selectedArea} onChange={setSelectedArea} />
            <RecipeSearchBar onAddIngredient={addIngredientToBasket} />
            <IngredientBasket basket={basket} onRemove={removeIngredientFromBasket} />
            <RecipeSearchResult results={results} />
        </div>
    );
};

