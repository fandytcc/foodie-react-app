import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { restaurantShape } from './RestaurantPage'
import './RestaurantItem.css'

const PLACEHOLDER = 'http://via.placeholder.com/350x180?text=No%20Image'

class RestaurantItem extends PureComponent {
  static propTypes = {
    ...restaurantShape.isRequired,
  }

  renderPrice(price, key) {
    const priceRange = Object.keys(price).filter(function(key) {
      return price[key] === true ? key : null
    })
    return priceRange[0]
  }

  renderAvgRating() {
    const { avgRating } = this.props
    const star = Math.round(avgRating/2)

    switch (star) {
      case 1:
        return '⭐✩✩✩✩'
      case 2:
        return '⭐⭐✩✩✩'
      case 3:
        return '⭐⭐⭐✩✩'
      case 4:
        return '⭐⭐⭐⭐✩'
      case 5:
        return '⭐⭐⭐⭐⭐'
      default:
        return '✩✩✩✩✩'
    }
  }

  render() {
    const { _id, name, reviews, price, photos, location } = this.props
    const reviewCount = reviews.length
    // console.log(this.props)

    return (
      <div className="restaurant-item">
        <Link to={`/restaurants/${_id}`}>
          <div
            className="restaurant-cover"
            style={{ backgroundImage:`url(${ photos[0].url || PLACEHOLDER })` }} />
        </Link>

        <div className="like-button">
          LikeButton
        </div>

        <div className="restaurant-content">
          <div className="restaurant-name">
            <h2>{ name }</h2>
          </div>

          <div className="restaurant-info" style={{color: 'grey'}}>
            <h4><span className="rating">{ this.renderAvgRating() }</span> - { reviewCount } Reviews - { location.address }, {location.postalCode}</h4>
          </div>

          <div id="restaurant-price">
            {this.renderPrice(price)}
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantItem
