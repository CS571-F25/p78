

import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import '../../App.css';


export const IngredientBasket = ({ basket = [], onRemove }) => {
	const [hoveredIdx, setHoveredIdx] = useState(null);
	if (!basket || basket.length === 0) return null;

	return (
		<div style={{ marginTop: 12 }}>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
				{basket.map((item, idx) => (
					<div key={item + idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
						<Badge
							pill
							bg={hoveredIdx === idx ? 'danger' : 'success'}
							style={{ fontSize: '1em', display: 'flex', alignItems: 'center', gap: 6, padding: '0.5em 1em', cursor: 'pointer', transition: 'background 0.2s' }}
							className={hoveredIdx === idx ? 'ingredient-badge-hover' : ''}
							onMouseEnter={() => setHoveredIdx(idx)}
							onMouseLeave={() => setHoveredIdx(null)}
							onClick={() => onRemove && onRemove(item)}
							title="Click to remove"
						>
							{item}
						</Badge>
					</div>
				))}
			</div>
		</div>
	);
};

