import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneRestaurant } from '../../actions/restaurants/fetch'
import { reviewShape } from '../../containers/reviews/ReviewPage'
// import RecipeItem from '../../containers/recipes/RecipeItem'
// import RecipeEditor from '../../containers/recipes/RecipeEditor'

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
  //
  // renderRecipe(recipe, index) {
  //   return <RecipeItem key={index} restaurantId={this.props.match.params.restaurantId} { ...recipe } />
  // }

  render() {
    if (!this.props.restaurant) return null

    const { _id, name, reviews } = this.props.restaurant
    // console.log(this.props.match.params.restaurantId

    return (
      <article className="restaurant-page">
        <header className="blocks-wrapper">
          <Typography variant="display1">
            Recipes Overview in Restaurant#{name}
          </Typography>

          <Typography variant="display1" style={{float:'left', marginRight: 20}}>Evaluations Overview</Typography>

          <Button
            variant="raised"
            className="primary"
            color="primary"
            onClick={this.getRandomRecipe.bind(this)}>
            Ask a question
          </Button>
        </header>

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
