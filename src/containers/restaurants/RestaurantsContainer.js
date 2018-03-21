import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import { restaurantShape } from './RestaurantPage'
import { fetchRestaurants } from '../../actions/restaurants/fetch'
import RestaurantItem from './RestaurantItem'
// import RestaurantEditor from './RestaurantEditor'
import MapContainer from '../MapContainer'
import CheckboxList from '../../components/CheckboxList'
//material-ui & styling
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
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
    const { restaurants } = this.props
    if (!restaurants) return null

    const typesArray = Object.keys(restaurants[0].types)
    const locationArray = restaurants.map(restaurant => restaurant.location.district)
    const priceArray = Object.keys(restaurants[0].price)
    const dietaryTypesArray = Object.keys(restaurants[0].dietaryType)

    return (
      <div className="main-container">
        <div className="side-bar">
          <MapContainer markers={restaurants} />

          <div className="search-field">
            <Typography variant="display1">Your Selections</Typography>
            <Divider style={{ width: `150%` }}/>

            <div className="types">
              <Typography variant="display1">Meals</Typography>
              <CheckboxList array={typesArray}/>
            </div>

            <div className="location">
              <Typography variant="display1" component="h1">Location</Typography>
              <CheckboxList array={locationArray}/>
            </div>

            <div className="price">
              <Typography variant="display1" component="h1">Price</Typography>
              <CheckboxList array={priceArray}/>
            </div>

            <div className="dietary-type">
              <Typography variant="display1" component="h1">Dietary Types</Typography>
              <CheckboxList array={dietaryTypesArray}/>
            </div>
          </div>
        </div>

        <div className="restaurants-container">
          <div className="top-box">
            <Typography variant="headline">
              Restaurants in Amsterdam
            </Typography>
            <Typography variant="headline">
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
