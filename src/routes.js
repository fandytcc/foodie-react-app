import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import RestaurantsContainer from './containers/restaurants/RestaurantsContainer'
import RestaurantPage from './containers/restaurants/RestaurantPage'
import ReviewPage from './containers/restaurants/ReviewPage'
import RecipePage from './containers/recipes/RecipePage'
import { SignIn, SignUp } from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={RestaurantsContainer} />
        <Route exact path="/restaurants/:restaurantId" component={RestaurantPage} />
        <Route exact path="/restaurants/:restaurantId/review" component={ReviewPage} />
        <Route path="/restaurants/:restaurantId/recipes/:recipeId" component={RecipePage} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
