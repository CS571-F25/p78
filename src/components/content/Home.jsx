import React from 'react';
import { RecipeSearchBar } from './RecipeSearchBar.jsx';

export const HomePage = () => {
    const handleSearch = () => {
        // Implement search functionality here
        console.log('Search button clicked');
    };
    return (
        <div>
            <h1>Welcome to the Recipe App</h1>
            <RecipeSearchBar onSearch={handleSearch} />
        </div>
    );
}
