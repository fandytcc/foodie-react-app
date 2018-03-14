import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { restaurantShape } from './RestaurantPage'
//material-ui
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

//style Card
const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
}

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

  }

  render() {
    console.log(this.props)
    const { _id, name, reviews, price, photos, avgRating  } = this.props
    const reviewCount = reviews.length

    return (
      <div className="restaurant-item">
        <Card className="restaurant-wrapper" style={ styles.card }>
          <Link to={`/restaurants/${_id}`}>
            <CardMedia
              className="restaurant-photo"
              style={ styles.media }
              image= { photos[0].url }
              title= "Restaurant Item"
            />
          </Link>
          <CardContent>
            <Typography variant="headline" component="h2">
              { name }
            </Typography>
            <Typography component="p">
              { avgRating }
            </Typography>
              { this.renderPrice(price) }
            <Typography component="p">
              { reviewCount } Reviews
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default RestaurantItem
