import React from 'react';
import './Recipe.css';

const Recipe = ({recipe}) => {
    return (
        <div className="recipe">
            <img 
                src={recipe.image_url}
                alt="pending..."
            />

            <div className="rec-info">
                <h3 className="rec-title">{recipe.title}</h3>
            </div>
        </div>
    );
}

export default Recipe;