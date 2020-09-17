import React from 'react';
import './SearchBar.css';

const SearchBar = ({setRecipes}) => {
    let recipes = [];

    const queryOptions = [
        "carrot","broccoli","asparagus","cauliflower","corn","cucumber","green pepper","lettuce","mushrooms",
        "onion","potato","pumpkin","red pepper","tomato","beetroot","brussel sprouts","peas","zucchini",
        "radish","sweet potato","artichoke","leek","cabbage","celery","chili","garlic","basil","coriander",
        "parsley","dill","rosemary","oregano","cinnamon","saffron","green bean","bean","chickpea","lentil",
        "apple","apricot","avocado","banana","blackberry","blackcurrant","blueberry","boysenberry","cherry",
        "coconut","fig","grape","grapefruit","kiwifruit","lemon","lime","lychee","mandarin","mango","melon",
        "nectarine","orange","papaya","passion fruit","peach","pear","pineapple","plum","pomegranate","quince",
        "raspberry","strawberry","watermelon","salad","pizza","pasta","popcorn","lobster","steak","bbq",
        "pudding","hamburger","pie","cake","sausage","tacos","kebab","poutine","seafood","chips","fries",
        "masala","paella","som tam","chicken","toast","marzipan","tofu","ketchup","hummus","chili",
        "maple syrup","parma ham","fajitas","champ","lasagna","poke","chocolate","croissant","arepas",
        "bunny chow","pierogi","donuts","rendang","sushi","ice cream","duck","curry","beef","goat","lamb",
        "turkey","pork","fish","crab","bacon","ham","pepperoni","salami","ribs"
    ];

    let newQueries = [];
    let oldQueries = [];

    const pushRecipes = (result) => {
        result.recipes.forEach(recipe => recipes.push(recipe));
    }

    const fetchRecipes = async() => {
        const queries = newQueries;

        const responsePromises = queries.map(query => {
            let foodUrl = new URL(
                "https://forkify-api.herokuapp.com/api/search"
            );

            let foodReqParams = {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            };

            let foodGetParams = {
                q: query
            }

            foodUrl.search = new URLSearchParams(foodGetParams);

            return fetch(foodUrl, foodReqParams);  
        });

        const responses = await Promise.all(responsePromises);

        const resultPromises = responses.map(response => response.json());
        const results = await Promise.all(resultPromises);

        recipes = [];
        results.forEach(result => pushRecipes(result));

        setRecipes(recipes);
    }

    const analyzeQueries = () => {
        const queries = newQueries;
        //console.log("Matching:", queries.length);

        if ((queries.length > 0) && (queries.length <= 4)) {
            fetchRecipes();
        } else {
            setRecipes([]);
        }
    }

    const searchChange = (e) => {
        const searchString = e.target.value;

        oldQueries = newQueries;

        newQueries = queryOptions.filter(query => {
            return query.includes(searchString);
        });

        let oldJSONQueries = JSON.stringify(oldQueries);
        let newJSONQueries = JSON.stringify(newQueries);

        console.log("Old:", oldJSONQueries);
        console.log("New:", newJSONQueries);
        console.log(newQueries[0]);

        if (oldJSONQueries !== newJSONQueries) {
            analyzeQueries();
        } else {
            setRecipes([]);
        }
    }

    return (
        <div className="search">
            <input 
                type="text" 
                placeholder="Search..." 
                name="searchBar"
                id="searchBar"
                size="50"
                onKeyUp={searchChange}
                />
        </div>
    );
}

export default SearchBar;