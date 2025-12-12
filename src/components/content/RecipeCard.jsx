
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext.jsx';


export const RecipeCard = ({ recipe }) => {
	const { isFavorite } = useContext(RecipeContext);
	const favorited = isFavorite ? isFavorite(recipe._id) : false;

	const bgColor = favorited ? '#fffbe6' : '#fff';

	let flagSrc = null;
	if (recipe.area) {
		const flagFile = recipe.area.replace(/ /g, '_').toLowerCase() + '.png';
		flagSrc = `/flags/${flagFile}`;
	}

	return (
		<Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
			<div style={{
				border: '1px solid #ccc',
				borderRadius: 8,
				padding: 16,
				margin: 8,
				width: 250,
				background: bgColor,
				transition: 'background 0.2s',
				position: 'relative',
				minHeight: 260
			}}>
				<img src={recipe.thumbnail} alt={recipe.name} style={{ width: '100%', borderRadius: 4, objectFit: 'cover', height: 150 }} />
				<h4 style={{ margin: '12px 0 4px 0' }}>{recipe.name}</h4>
				<div style={{ color: '#888', fontSize: 14 }}>{recipe.category}</div>
				<div style={{ fontSize: 12, color: '#aaa' }}>ID: {recipe._id}</div>
				{flagSrc && (
					<img
						src={flagSrc}
						alt={recipe.area + ' flag'}
						style={{
							position: 'absolute',
							bottom: 10,
							right: 10,
							width: 32,
							height: 20,
							objectFit: 'contain',
							borderRadius: 2,
							boxShadow: '0 1px 4px rgba(0,0,0,0.10)'
						}}
						loading="lazy"
						onError={e => { e.target.style.display = 'none'; }}
					/>
				)}
			</div>
		</Link>
	);
};
 

