
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext.jsx';
import Card from 'react-bootstrap/Card';

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
		<Card className="h-100" style={{ background: bgColor }}>
			<Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
				{recipe.thumbnail ? (
					<Card.Img variant="top" src={recipe.thumbnail} alt={recipe.name} style={{ height: 150, objectFit: 'cover' }} />
				) : null}
				<Card.Body>
					<Card.Title className="mb-1">{recipe.name}</Card.Title>
					<div className="text-muted" style={{ fontSize: 14 }}>{recipe.category}</div>
				</Card.Body>
			</Link>
			{flagSrc && (
				<img
					src={flagSrc}
					alt={recipe.area + ' flag'}
					style={{
						position: 'absolute',
						bottom: 12,
						right: 12,
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
		</Card>
	);
};
 

