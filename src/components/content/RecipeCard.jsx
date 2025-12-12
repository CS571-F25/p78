
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
		<Card
			className="h-100"
			style={{
				background: bgColor,
				width: 240,
				height: 320,
				minWidth: 240,
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Link
				to={`/recipe/${recipe._id}`}
				style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
			>
				{recipe.thumbnail ? (
					<Card.Img
						variant="top"
						src={recipe.thumbnail}
						alt={recipe.name}
						style={{ height: 140, objectFit: 'cover' }}
					/>
				) : null}
				<Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 12, flex: '1 1 auto' }}>
					<Card.Title className="mb-1" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{recipe.name}</Card.Title>
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
 

