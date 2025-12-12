import React from 'react';

export default function AboutPage() {
    return (
        <div>
            <h1>About This App</h1>
            <p>This Recipe App was built as a project for CS571.</p>
            <p>All the recipe data was fetched from TheMealDB — a (somewhat) free, open database of meals and recipes.</p>
            <p>Credits: <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">TheMealDB</a></p>
        </div>
    );
}
