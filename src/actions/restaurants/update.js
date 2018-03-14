import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export const RECIPE_UPDATED = 'RECIPE_UPDATED'
export const RECIPE_REMOVED = 'RECIPE_REMOVED'

export const updateRecipe = (restaurantId, recipeId, recipeUpdates) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.patch(`/restaurants/${restaurantId}/recipes/${recipeId}`, recipeUpdates)
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: RECIPE_UPDATED, payload: res.body })
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

export const clearRecipe = (restaurantId, recipeId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.delete(`/restaurants/${restaurantId}/recipes/${recipeId}`)
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: RECIPE_REMOVED, payload: res.body })
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
