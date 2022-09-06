import React from 'react'

const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Calories: {calories}</h6>
        <div class="d-flex justify-content-around">
        <img src={image} alt={title + ' recipe image'} />
        <p class="card-text"><ol>
          {ingredients.map((ingredient, idx) => (
            <div key={idx}>
              <li key={idx}>{ingredient.text}</li>
            </div>
          ))}
        </ol></p>
        </div>
      </div>
    </div>
  )
}

export default Recipe