import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { RestaurantsContainer, RestaurantPage, RecipePage, ReviewPage, SignIn, SignUp } from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={RestaurantsContainer} />
        <Route exact path="/restaurants" component={RestaurantsContainer} />
        <Route exact path="/restaurants/:restaurantId" component={RestaurantPage} />
        <Route exact path="/restaurants/:restaurantId/review" component={ReviewPage} />
        <Route path="/restaurants/:restaurantId/recipes/:recipeId" component={RecipePage} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
