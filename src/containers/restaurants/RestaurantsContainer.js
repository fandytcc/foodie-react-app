import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import RestaurantItem from './RestaurantItem'
import RestaurantEditor from './RestaurantEditor'
import { restaurantShape } from './RestaurantPage'
import { fetchRestaurants } from '../../actions/restaurants/fetch'
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
      <div className="restaurants-wrapper" style={{margin:20}}>
        <RestaurantEditor />

        <Typography variant="display1" style={{textAlign:"center"}}>All Current Restaurants</Typography>

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
// const mapDispatchToProps = { fetchRestaurants, fetchRecipes }

export default connect(mapStateToProps, { fetchRestaurants })(RestaurantsContainer)
