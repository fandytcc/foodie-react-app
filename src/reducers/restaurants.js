// src/reducers/restaurants.js
import { FETCHED_RESTAURANTS, FETCHED_ONE_RESTAURANT, FETCHED_ONE_RECIPE } from '../actions/restaurants/fetch'
import { RESTAURANT_CREATED, RECIPE_CREATED } from '../actions/restaurants/create'
import { RECIPE_UPDATED, RECIPE_REMOVED } from '../actions/restaurants/update'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_RESTAURANTS :
      return Object.assign({}, state, { allRestaurants: payload })

    case FETCHED_ONE_RESTAURANT :
      return Object.assign({}, state, { selectedRestaurant: payload, recipesPerRestaurant: payload.recipes })

    case FETCHED_ONE_RECIPE :
      return Object.assign({}, state, { selectedRecipe: payload })

    case RESTAURANT_CREATED :
      return Object.assign({}, state, { allRestaurants: [payload].concat(state.allRestaurants) })
      // return [newRestaurant].concat(state)

    case RECIPE_CREATED :
      return Object.assign({}, state, { selectedRestaurant: payload })

    case RECIPE_UPDATED :
      return Object.assign({}, state, { selectedRestaurant: payload })

    case RECIPE_REMOVED :
      return Object.assign({}, state, { selectedRestaurant: payload })

    default :
      return state

  }
}
