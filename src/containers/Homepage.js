import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { PlacesWithStandaloneSearchBox } from '../components/SearchBar'
import { restaurantShape } from '../containers/restaurants/RestaurantPage'
import RestaurantItem from '../containers/restaurants/RestaurantItem'
import { fetchRestaurants } from '../actions/restaurants/fetch'
//material-ui & styling
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import './Homepage.css'

class Homepage extends PureComponent {
  static PropTypes = {
    restaurants: PropTypes.arrayOf(restaurantShape).isRequired,
  }

  componentWillMount() {
    this.props.fetchRestaurants()
  }

  renderRestaurant(restaurant) {
    return restaurant.name && restaurant.avgRating && restaurant.reviews.length && restaurant.location.district && restaurant.location.country
  }

  checkBreakfast(restaurants) {
    const breakfastPlaces = restaurants.map(restaurant => {
      return restaurant.types.breakfast===true ? this.renderRestaurant(restaurant) : null
    })

    return breakfastPlaces
  }

  render() {
    const { restaurants } = this.props
    if (!restaurants) return null

    return (
      <article className="home-container">
        <section className="search-container">
          <div className="search-bar">
            <PlacesWithStandaloneSearchBox />
            <Button
              variant="raised"
              color="secondary"
              style={{
                minWidth: `120px`,
                height: `70px`,
                borderTopRightRadius: `40px`,
                borderBottomRightRadius: `40px`,
                fontSize: 24,
                flex: `0 0 15%`
              }}>
              Search
            </Button>
          </div>
        </section>

        <main className="type-container">
          <section className="type-wrapper">
            <Typography variant="display1" color="inherit">
              Breakfast
            </Typography>
            <div>
              {this.checkBreakfast(restaurants)}
            </div>
          </section>
          <section className="type-wrapper">
            <Typography variant="display1" color="inherit">
              Lunch
            </Typography>
          </section>
          <section className="type-wrapper">
            <Typography variant="display1" color="inherit">
              Dinner
            </Typography>
          </section>
          <section className="type-wrapper">
            <Typography variant="display1" color="inherit">
              Cafe
            </Typography>
          </section>
          <section className="type-wrapper">
            <Typography variant="display1" color="inherit">
              Dessert
            </Typography>
          </section>
        </main>
      </article>
    )
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants.allRestaurants
})

export default connect(mapStateToProps, { fetchRestaurants })(Homepage)
