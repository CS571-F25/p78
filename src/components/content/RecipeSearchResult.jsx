
import React from 'react';
import { RecipeCard } from './RecipeCard.jsx';

export const RecipeSearchResult = ({ results = [] }) => {
	if (!results || results.length === 0) return null;

	return (
		<div style={{ marginTop: 24 }}>
			<h4>Recipes Found:</h4>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
				{results.map(recipe => (
					<RecipeCard key={recipe._id} recipe={recipe} />
				))}
			</div>
		</div>
	);
};
