import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import RestaurantItem from './RestaurantItem'
// import MapContainer from './containers/MapContainer'
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
    const { restaurants } = this.props
    // console.log(this.props)

    return (
      <div className="main-container">
        <div className="side-bar">
          Map
        </div>

        <div className="restaurants-container">
          <div className="top-box">
            <Typography variant="headline" component="h1">
              Restaurants in Amsterdam
            </Typography>
            <Typography variant="headline" component="h2">
              <strong>{restaurants.length}</strong> results founds
            </Typography>
          </div>

          <div className="restaurants-wrap">
            { this.props.restaurants.map(this.renderRestaurant) }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants.allRestaurants
})

export default connect(mapStateToProps, { fetchRestaurants })(RestaurantsContainer)
