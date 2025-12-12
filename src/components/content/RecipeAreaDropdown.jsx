
import React from 'react';

const AREAS = [
	'Algerian', 'American', 'Argentinian', 'Australian', 'British', 'Canadian', 'Chinese', 'Croatian', 'Dutch',
	'Egyptian', 'Filipino', 'French', 'Greek', 'Indian', 'Irish', 'Italian', 'Jamaican', 'Japanese', 'Kenyan',
	'Malaysian', 'Mexican', 'Moroccan', 'Norwegian', 'Polish', 'Portuguese', 'Russian', 'Saudi Arabian',
	'Slovakian', 'Spanish', 'Syrian', 'Thai', 'Tunisian', 'Turkish', 'Ukrainian', 'Uruguayan', 'Venezulan', 'Vietnamese'
];

export const RecipeAreaDropdown = ({ selectedArea, onChange }) => (
	<div style={{ margin: '16px 0' }}>
		<label htmlFor="area-select" style={{ marginRight: 8 }}></label>
		<select
			id="area-select"
			value={selectedArea || ''}
			onChange={e => onChange(e.target.value)}
			style={{ padding: '4px 8px', borderRadius: 4 }}
		>
			<option value="">All Countries</option>
			{AREAS.map(area => (
				<option key={area} value={area}>{area}</option>
			))}
		</select>
	</div>
);
