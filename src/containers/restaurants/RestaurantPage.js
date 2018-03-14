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
    result: PropTypes.string,
    fetchOneRestaurant: PropTypes.func.isRequied
  }

  componentWillMount() {
    this.props.fetchOneRestaurant(this.props.match.params.restaurantId)
  }
  // 
  // renderRecipe(recipe, index) {
  //   return <RecipeItem key={index} restaurantId={this.props.match.params.restaurantId} { ...recipe } />
  // }

  createWeightedList(list, weight) {
    const weightedList = []

    for (let i=0; i < weight.length; i++) {
      let multiples = weight[i] * 100

      for (let j=0; j < multiples; j++) {
        weightedList.push(list[i])
      }
    }
    return weightedList
  }

  getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomRecipe(event) {
    event.preventDefault()
    const { recipes } = this.props.restaurant

    const colorList = ["G", "Y", "R"]
    const weight = [0.21, 0.32, 0.47]
    const weightedList = this.createWeightedList(colorList, weight)
    const randomNum = this.getRandomNum(0, weightedList.length-1)
    const randomColor = weightedList[randomNum]

    const greenRecipes = recipes.filter(recipe => recipe.evaluations[recipe.evaluations.length-1].code === "G")
    const yellowRecipes = recipes.filter(recipe => recipe.evaluations[recipe.evaluations.length-1].code === "Y")
    const redRecipes = recipes.filter(recipe => recipe.evaluations[recipe.evaluations.length-1].code === "R")

    let result =""
    let result2 = ""
      if (randomColor === "G") {
        const randomNum = this.getRandomNum(0, greenRecipes.length-1)
        result = greenRecipes && greenRecipes[randomNum].name
        result2 = greenRecipes && greenRecipes[randomNum].photo
      } else if (randomColor === "Y") {
        const randomNum = this.getRandomNum(0, yellowRecipes.length-1)
        result = yellowRecipes && yellowRecipes[randomNum].name
        result2 = yellowRecipes && yellowRecipes[randomNum].photo
      } else if (randomColor === "R") {
        const randomNum = this.getRandomNum(0, redRecipes.length-1)
        result = redRecipes && redRecipes[randomNum].name
        result2 = redRecipes && redRecipes[randomNum].photo
      }
      alert(result)
      alert(result2)
  }

//dialogue - ask a question
  // handleClose = () => {
  //   this.props.onClose(this.props.selectedValue);
  // }
  //
  // handleListItemClick = value => {
  //   this.props.onClose(value);
  // }

  render() {
    if (!this.props.restaurant) return null

    const { _id, title, recipes } = this.props.restaurant
    // console.log(this.props.match.params.restaurantId)
    const restaurantSize = recipes.length

    const greenRecipes = recipes.filter(recipe => recipe.evaluations[recipe.evaluations.length-1].code === "G")
    const redRecipes = recipes.filter(recipe => recipe.evaluations[recipe.evaluations.length-1].code === "R")
    const yellowRecipes = recipes.filter(recipe => recipe.evaluations[recipe.evaluations.length-1].code === "Y")

    const greenPercentage = Math.round(greenRecipes.length/restaurantSize*100)
    const redPercentage = Math.round(redRecipes.length/restaurantSize*100)
    const yellowPercentage = Math.round(yellowRecipes.length/restaurantSize*100)

    return (
      <article className="restaurant-page">
        <Paper style={style}>
          <div className="recipe-editor">
            <RecipeEditor restaurantId={this.props.match.params.restaurantId} />
          </div>
        </Paper>

        <header className="blocks-wrapper">
          <Typography variant="display1">
            Recipes Overview in Restaurant#{title}
          </Typography>

          <Typography variant="display1" style={{float:'left', marginRight: 20}}>Evaluations Overview</Typography>

          <Button
            variant="raised"
            className="primary"
            color="primary"
            onClick={this.getRandomRecipe.bind(this)}>
            Ask a question
          </Button>

          <div className="evaluation-overview">
            <div className="color-block" style={{width:`${greenPercentage}%`, background: "#4ECDC4"}}>
              <p>{greenPercentage ? greenPercentage : '0'}%</p>
            </div>

            <div className="color-block" style={{width:`${yellowPercentage}%`, background: "#FFE66D"}}>
              <p>{yellowPercentage ? yellowPercentage : '0'}%</p>
            </div>

            <div className="color-block" style={{width:`${redPercentage}%`, background: "#FF6B6B"}}>
              <p>{redPercentage ? redPercentage : '0'}%</p>
            </div>
          </div>
        </header>

        <main className="recipes-wrapper">
          <div className="recipes">
            {recipes.map(this.renderRecipe.bind(this))}
          </div>
        </main>

      </article>
    )
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurants.selectedRestaurant,
})

export default connect(mapStateToProps, { fetchOneRestaurant })(RestaurantPage)
