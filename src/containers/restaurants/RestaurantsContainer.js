import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import RestaurantItem from './RestaurantItem'
// import RestaurantEditor from './RestaurantEditor'
import { restaurantShape } from './RestaurantPage'
import { fetchRestaurants } from '../../actions/restaurants/fetch'

//material-ui & styling
import Typography from 'material-ui/Typography'
import './RestaurantsContainer.css'

class RestaurantsContainer extends PureComponent {
  static PropTypes = {
    restaurants: PropTypes.arrayOf(restaurantShape).isRequired,
  }

  componentWillMount() {
    this.props.fetchRestaurants()
  }

  renderRestaurant(restaurant, index) {
    return <RestaurantItem key={index} { ...restaurant } />
  }

  render() {
    if (!this.props.restaurants) return null

    return (
      <div className="restaurant-container">
        <div className="top-box">
          <h1>Restaurants in Amsterdam</h1>
          <p>google map search bar component</p>
          <div className="restaurant-type">
            <ul>
              <li>Breakfast</li>
              <li>Lunch</li>
              <li>Dinner</li>
              <li>Cafe</li>
              <li>Dessert</li>
            </ul>
          </div>
        </div>

        <div className="restaurants">
          { this.props.restaurants.map(this.renderRestaurant) }
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants.allRestaurants
})

export default connect(mapStateToProps, { fetchRestaurants })(RestaurantsContainer)
