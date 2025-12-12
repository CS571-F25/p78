
import React from 'react';
import { Badge, Button } from 'react-bootstrap';

export const IngredientBasket = ({ basket = [], onRemove }) => {
	if (!basket || basket.length === 0) return null;

	return (
		<div style={{ marginTop: 12 }}>
			<div>Basket:</div>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
				{basket.map((item, idx) => (
					<div key={item + idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
						<Badge pill bg="success" style={{ fontSize: '1em' }}>{item}</Badge>
						<Button variant="outline-secondary" size="sm" onClick={() => onRemove(item)}>x</Button>
					</div>
				))}
			</div>
		</div>
	);
};

