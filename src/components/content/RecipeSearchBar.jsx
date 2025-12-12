// presentational search input component using RecipeContext for suggestions
import React from 'react';
import { Form, FormControl, ListGroup } from 'react-bootstrap';
import { useContext, useRef, useState, useEffect } from 'react';
import { RecipeContext } from '../context/RecipeContext.jsx';

export const RecipeSearchBar = ({ onAddIngredient }) => {
    const { ingredients = [] } = useContext(RecipeContext);
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (input.trim() === '') {
            setSuggestions([]);
            return;
        }
        const matches = ingredients.filter(ing =>
            ing.toLowerCase().startsWith(input.toLowerCase())
        ).slice(0, 5);
        setSuggestions(matches);
    }, [input, ingredients]);

    useEffect(() => {
        const handleClick = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleSuggestionClick = (suggestion) => {
        setInput('');
        setShowSuggestions(false);
        if (onAddIngredient) onAddIngredient(suggestion);
    };

    return (
        <div style={{ position: 'relative', maxWidth: 600 }} ref={inputRef}>
            <Form autoComplete="off">
                <FormControl
                    type="text"
                    placeholder="Search ingredients..."
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                />
            </Form>
            {showSuggestions && suggestions.length > 0 && (
                <ListGroup style={{ position: 'absolute', zIndex: 1000, width: '100%' }}>
                    {suggestions.map(s => (
                        <ListGroup.Item key={s} action onClick={() => handleSuggestionClick(s)}>
                            {s}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};