import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const FETCHED_RESTAURANTS = 'FETCHED_RESTAURANTS'
export const FETCHED_ONE_RESTAURANT = 'FETCHED_ONE_RESTAURANT'
export const FETCHED_ONE_RECIPE = 'FETCHED_ONE_RECIPE'

const api = new API()

export const fetchRestaurants = () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('/restaurants')
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_RESTAURANTS,
          payload: res.body
        })
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

export const fetchOneRestaurant = (restaurantId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/restaurants/${restaurantId}`)
      .then((res) => {
        console.log(res)
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_RESTAURANT,
          payload: res.body
        })
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

export const fetchOneRecipe = (restaurantId, recipeId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/restaurants/${restaurantId}/recipes/${recipeId}`)
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_RECIPE,
          payload: res.body
        })
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
