import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Marker } from 'react-google-maps'
import { MyMapComponent } from '../../components/Map'
import { fetchOneRestaurant } from '../../actions/restaurants/fetch'
import { reviewShape } from '../../containers/reviews/ReviewPage'
// import RecipeItem from '../../containers/recipes/RecipeItem'
//material-ui & styling
import Typography from 'material-ui/Typography'
import './RestaurantPage.css'

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
    isMarkerShown: false,
  }

  static propTypes = {
    ...restaurantShape.isRequired,
    fetchOneRestaurant: PropTypes.func.isRequied
  }

  componentWillMount() {
    this.props.fetchOneRestaurant(this.props.match.params.restaurantId)
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 2000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  renderSingleMarker(location, name) {
    const marker = {
      position: {
        lat: location.geo[1],
        lng: location.geo[0]
      },
      label: name
    }
    console.log(marker)
    return <Marker {...marker} />
  }

  renderObject(obj) {
    const objectKey = Object.keys(obj).map(function(key, i) {
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
    // console.log(this.props.match.params.restaurantId

    return (
      <article className="restaurant-page">
        <header className="restaurant-header">
          <Typography variant="display2" color="inherit">
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

            <div className="like-button">
              LikeButton
            </div>
          </div>

          <div className="restaurant-map">
            <MyMapComponent
              isMarkerShown={this.state.isMarkerShown}
              onMarkerClick={this.handleMarkerClick}
              markers={this.renderSingleMarker(location, name)}/>
          </div>

          <div className="photo-wrapper">
            {photos && photos.map(photo => <img src={photo.url} alt="" />)}
          </div>

          <summary className ="description">
            <Typography variant="title">
              {summary}
            </Typography>
          </summary>
        </section>

        <section className="top-recipes-wrapper">
          <header>
            <Typography variant="headline">
              Top 3 dishes to order from this menu
            </Typography>
          </header>

          <main className="top-recipes">
            <div className="recipe-1">
              dish 1
            </div>
            <div className="recipe-1">
              dish 2
            </div>
            <div className="recipe-1">
              dish 3
            </div>
          </main>
        </section>

        <aside className="side-box-1">
          Learn more about this cuisine
        </aside>

        <aside className="side-box-2">
          Try Making these dishes at home!
          Link 1 - suggested recipe
          Link 2 - suggested recipe
        </aside>
      </article>
    )
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurants.selectedRestaurant,
})

export default connect(mapStateToProps, { fetchOneRestaurant })(RestaurantPage)
