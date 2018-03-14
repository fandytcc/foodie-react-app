// src/actions/restaurants/create.js
import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const RESTAURANT_CREATED = 'RESTAURANT_CREATED'
export const RECIPE_CREATED = 'RECIPE_CREATED'

const api = new API()

export const createRestaurant = (newRestaurant) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/restaurants', newRestaurant)
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: RESTAURANT_CREATED, payload: res.body })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const createRecipe = (restaurantId, newRecipe) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post(`/restaurants/${restaurantId}/recipes`, newRecipe)
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: RECIPE_CREATED, payload: res.body })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
