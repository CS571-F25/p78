
import React from 'react';
import { RecipeCard } from './RecipeCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';

export const RecipeSearchResult = ({ results = [] }) => {
	if (!results || results.length === 0) return null;

	return (
		<Container className="mt-3">
			<h4>Recipes Found:</h4>
			<Row className="g-3 mt-2">
				{results.map((recipe) => (
					<Col key={recipe._id} xs={12} sm={6} md={4} lg={3}>
						<RecipeCard recipe={recipe} />
					</Col>
				))}
			</Row>
		</Container>
	);
};
