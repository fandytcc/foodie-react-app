import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RecipePage, { recipeShape } from './RecipePage'
//material-ui & styling
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import './RecipeItem.css'

//styling paper
// const style = {
//   paddingTop: 16,
//   paddngBottom: 16,
//   paddingLeft: 40,
//   height: 300,
//   width: 250,
//   margin: 20,
//   textAlign: 'left',
//   display: 'inline-block',
// }

const cardStyles = {
  card: {
    width: 250,
    margin: 20,
    display: 'inline-block',
  },
  media: {
    height: 200,
  },
}

class RecipeItem extends PureComponent {
  static propTypes = {
    ...recipeShape.isRequired,
  }

  classNames() {
    const { evaluations } = this.props
    const lastEvaluation = evaluations[evaluations.length-1]
    const lastColorCode = lastEvaluation.code

    return `block ${lastColorCode}`
  }

  render() {
    const { _id, name, photo, restaurantId } = this.props

    return (
      <Card className="RecipeItem" style={cardStyles.card}>
        <Link to={`/restaurants/${restaurantId}/recipes/${_id}`}>
          { photo && <CardMedia style={cardStyles.media} image={ photo } title="recipe"/> }
        </Link>
        <CardContent>
          <Link to={`/restaurants/${restaurantId}/recipes/${_id}`}>
            <Typography variant="title">
              { name }
            </Typography>
          </Link>
        </CardContent>
        <CardActions>
          <div className={this.classNames()}></div>
          <p>Latest evaluation</p>
        </CardActions>
      </Card>
    )
  }
}

export default RecipeItem
