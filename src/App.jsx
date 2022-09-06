import './App.css';
import React, { useEffect, useState } from 'react'
import Recipe from './components/Recipe';
import axios from 'axios'

const App = () => {
  const APP_ID = 'a547920a'
  const APP_KEY = '320b25e53d0fe04bbf0016dce846dd5b'

  // create a state that will hold whatever recipes the api fetches
  // will be an array of objects
  const [recipes, setRecipes] = useState([]);

  // state for the word in the search field
  const [search, setSearch] = useState('');
  // state for the word when completed and the button is clicked
  const [query, setQuery] = useState('');


   // useState has en empty string: never will not change
  // so we need a handle function to use setSearch
  const updateSearch = e => {
    // set it to the value of the input and pass it to search through the setstate
    setSearch(e.target.value)
  }

  
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    // clear input field after search results
    setSearch('')
  }

// Too many bugs with axios
// useEffect(() => {
//   axios.get(`https://api.edamam.com/search?q=eggs&app_id=${APP_ID}&app_key=${APP_KEY}`)
//   .then(response => setRecipes(response.data))
// }, [])

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response =  await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`); 
    const data = await response.json();
    setRecipes(data.hits);
  }
  
// info is fetched from api, stored directly into recipes through setRecipes
// then we pass it down as prop inside the <recipe /> component inside App
// that way the component is able to catch it inside its own file and use it
// App: finds the info, formats it
// Component: catches the info, formats/styles it


  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form pt-4 pb-4'>
        {/* send whatever input value to the search state */}
        <input className='search-bar' type="text" value={search} onChange={updateSearch}/>
        <button className='btn btn-dark' type='submit'>search</button>
      </form>
      {recipes.map((recipe, idx) => (
        <div key={idx}>
          {/* send a prop from the information inside recipe(api) */}
            <Recipe title={recipe.recipe.label} calories={Math.round(recipe.recipe.calories)} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
        </div>
      ))}
    </div>
  )
}

export default App;
