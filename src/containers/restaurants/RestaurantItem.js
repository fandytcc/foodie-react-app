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

  render() {
    console.log(this.props)
    const { _id, name, reviews, price, photos  } = this.props
    const reviewCount = reviews.length

    return (
      <div className="restaurant-item">
        <Card className="restaurant-wrapper" style={ styles.card }>
          <Link to={`/restaurants/${_id}`}>
            <CardMedia
              className="restaurant-photo"
              style={ styles.media }
              image= { photos[0] }
              title= "Restaurant Item"
            />
          </Link>
          <CardContent>
            <Typography variant="headline" component="h2">
              { name }
            </Typography>
            <Typography component="p">
              { price }
              { reviewCount } Reviews
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default RestaurantItem
