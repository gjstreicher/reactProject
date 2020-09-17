import React, {useState, useEffect} from 'react';
import './Page.css';

import SearchBar from '../search-bar/SearchBar.js'
import Recipe from '../recipe/Recipe.js';
import './data.json';

const Page = () => {
    const [recipes, setRecipes] = useState([]);
    
    return ( 
        <div className="page">
            <h1 className="banner">Today's Recipes:</h1>

            <SearchBar 
                setRecipes={setRecipes}
            />

            {recipes.map((recipe, index) => (
                <Recipe key={index} recipe={recipe} />
            ))}
            
            <div className="content">
                
            </div>
        </div>
    );
}

export default Page;