import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneRestaurant } from '../../actions/restaurants/fetch'
import { reviewShape } from '../../containers/reviews/ReviewPage'
// import RecipeItem from '../../containers/recipes/RecipeItem'
//material-ui & styling
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import './RestaurantPage.css'

//styling Paper
const style = {
  height: 250,
  width: 300,
  display: 'inline-block',
  margin: 16,
  marginLeft: 90,
}

export const restaurantShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequied,
  phone: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  location: PropTypes.shape({
    address: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    district: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string.isRequired,
    geo: PropTypes.array.isRequired
  }),
  photos: PropTypes.array,
  price: PropTypes.shape({
    cheapEats: PropTypes.bool,
    midRange: PropTypes.bool,
    fineDining: PropTypes.bool,
  }),
  type: PropTypes.shape({
    breakfast: PropTypes.bool,
    lunch: PropTypes.bool,
    dinner: PropTypes.bool,
    cafe: PropTypes.bool,
    deseert: PropTypes.bool,
  }),
  dietaryType: PropTypes.shape({
    vegetarian: PropTypes.bool,
    vegan: PropTypes.bool,
    halal: PropTypes.bool,
    glutenfree: PropTypes.bool,
  }),
  avgRating: PropTypes.number,
  reviews: PropTypes.arrayOf(reviewShape)
})

class RestaurantPage extends PureComponent {
  state = {
    open: false,
  }

  static propTypes = {
    ...restaurantShape.isRequired,
    fetchOneRestaurant: PropTypes.func.isRequied
  }

  componentWillMount() {
    this.props.fetchOneRestaurant(this.props.match.params.restaurantId)
  }

  renderObject(obj) {
    const objectKey = Object.keys(obj).map(function(key, i) {
      console.log(key)
      return obj[key]===true ? key : null
    })

    return objectKey.join(' ')
  }

  // renderRecipe(recipe, index) {
  //   return <RecipeItem key={index} restaurantId={this.props.match.params.restaurantId} { ...recipe } />
  // }

  render() {
    if (!this.props.restaurant) return null

    const { avgRating, dietaryType, likedBy, location, name, phone, photos, price, reviews, summary, types, url } = this.props.restaurant
    console.log(photos)
    // console.log(this.props.match.params.restaurantId

    return (
      <article className="restaurant-page">
        <header className="restaurant-header">
          <Typography variant="display2">
            {name}
          </Typography>
        </header>

        <section className="restaurant-details">
          <div className="detailers-wrapper">
            <Typography variant="title">
              {avgRating} | {reviews && reviews.length} Review | Ranking in Amsterdam | {this.renderObject(price)} | {this.renderObject(types)} | {this.renderObject(dietaryType)}
              <br />
              { location.address }, {location.postalCode} | {phone} | {url}
            </Typography>
          </div>

          Likebutton

          <iframe className="location-map">

          </iframe>

          <div className="photo-wrapper">
            {photos && photos.map(photo => <img src={photo.url} alt="" />)}
          </div>

          <summary className ="description">
            {summary}
          </summary>
        </section>

        <section className="top-recipes-wrapper">
          <header>
            <Typography variant="headline">
              Top 3 dishes to order from this menu
            </Typography>
          </header>

          <main className="top-recipes">


          </main>

        </section>

      </article>
    )
  }
}

  // <main className="recipes-wrapper">
  //   <div className="recipes">
  //     {recipes.map(this.renderRecipe.bind(this))}
  //   </div>
  // </main>

const mapStateToProps = state => ({
  restaurant: state.restaurants.selectedRestaurant,
})

export default connect(mapStateToProps, { fetchOneRestaurant })(RestaurantPage)
