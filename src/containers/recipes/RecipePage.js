import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'
import { fetchOneRestaurant, fetchOneRecipe } from '../../actions/restaurants/fetch'
import { updateRecipe, clearRecipe } from '../../actions/restaurants/update'
//material-ui & styling
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import ThumbsUpDownIcon from 'material-ui-icons/ThumbsUpDown'
import ThumbDownIcon from 'material-ui-icons/ThumbDown'
import ThumbUpIcon from 'material-ui-icons/ThumbUp'
import Tooltip from 'material-ui/Tooltip'
import './RecipePage.css'

//styling Paper
const paperStyle = {
  padding: 70,
  height: 600,
  width: 1250,
  margin: 20
}

export const recipeShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequied,
    evaluations: PropTypes.array,
})

class RecipePage extends PureComponent {

  state = {
    name: "",
    photo:"",
    evaluatedAt: new Date(),
    remark:"",
    code:"",
    selected: false,
  }

//increase button size when selected
  // toggleClass() {
  //   const currentState = this.state.selected
  //   this.setState({
  //     selected: !currentState
  //   })
  // }

  componentWillMount() {
    const restaurantId = this.props.match.params.restaurantId
    const recipeId = this.props.match.params.recipeId

    this.props.fetchOneRestaurant(restaurantId)
    this.props.fetchOneRecipe(restaurantId, recipeId)
  }

  handleClick = (evaluationId) => {
    this.selectEvaluation(evaluationId)
  }

// view selected evaluation details after pressing EDIT button
  selectEvaluation(evaluationId) {
    const { evaluations } = this.props.recipe
    const selectedEvaluation = evaluations.filter(evaluation => evaluation._id === evaluationId)[0]

    this.setState({
      evaluatedAt: selectedEvaluation.evaluatedAt,
      remark: selectedEvaluation.remark,
      code: selectedEvaluation.code
    })
  }

  changeColor = (event) => {
    const color = event.currentTarget.value
    this.setState({code: color})
  }

  checkColor(evaluation) {
    const colorCode = evaluation.code
    if (colorCode === "Y") return "#FFE66D"
    if (colorCode === "G") return "#4ECDC4"
    if (colorCode === "R") return "#FF6B6B"
    if (colorCode === 'W') return "#b3b6bc"
  }

  renderEvaluations(evaluation) {
    const evaluationId = evaluation._id
    const evaluationDate = (new Date(evaluation.evaluatedAt)).toDateString()
    return (
      <Tooltip id="tooltip-bottom" title={evaluationDate} placement="bottom">
        <Button
          key={evaluationId}
          variant="flat"
          className="evaluation-code"
          style={{ backgroundColor:this.checkColor(evaluation), margin:1 }}
          onClick={() => this.handleClick(evaluationId)}>
        </Button>
      </Tooltip>
    )
  }

//Edit recipe button for name & photo only, use dialogue
  editRecipe() {
    const { recipe } = this.props
    this.setState({
      name: recipe.name,
      photo: recipe.photo
    })
  }

//Evaluation form textfield
  updateEvaluatedAt(event) {
    this.setState({
      evaluatedAt: event.target.value
    })
  }

//validateRemark: compulsory field for yellow & red
  updateRemark(event) {
    this.setState({
      remark: event.target.value
    })
  }

  goToRestaurant() {
    const { restaurantId } = this.props.match.params
    this.props.push(`/restaurants/${restaurantId}`)
  }

//save recipe button
  saveRecipe(event) {
    event.preventDefault()
    const { restaurantId, recipeId } = this.props.match.params
    const recipeUpdates = { ...this.state }
    this.props.updateRecipe(restaurantId, recipeId, recipeUpdates)
    this.goToRestaurant()
  }

// save recipe and next button
  findNextRecipe() {
    const { recipeId } = this.props.match.params
    const { restaurant } = this.props

    let recipeIndex = restaurant.recipes.findIndex(recipe => recipe._id === recipeId)
    let nextRecipeIndex = recipeIndex + 1

    if (nextRecipeIndex === restaurant.recipes.length) {
      return restaurant.recipes[0]._id
    } else {
      return restaurant.recipes[nextRecipeIndex]._id
    }
  }

  goToNextRecipe() {
    const { restaurantId } = this.props.match.params
    const nextRecipeId = this.findNextRecipe()
    this.props.replace(`/restaurants/${restaurantId}/recipes/${nextRecipeId}`)
  }

  saveRecipeAndNext(event) {
    this.saveRecipe(event)
    this.goToNextRecipe()
  }

//delete recipe button
  clearRecipe() {
    const { restaurantId, recipeId } = this.props.match.params
    this.props.clearRecipe(restaurantId, recipeId)
    this.goToRestaurant()
  }

  render() {
    if (!this.props.restaurant || !this.props.recipe) return null
    const { name, photo, evaluations } = this.props.recipe
    const { selected } = this.state
    console.log(this.props)

    return(
      <Paper className="recipe-container" style={paperStyle} elevation={2}>
        <div className="recipe-details">

          <div className="photo">
            { photo && <Avatar src={ photo } style={{width:200, height:200 }} alt="Recipe Images" /> }
          </div>

          <div className="info">
            <Typography variant="headline">{ name }</Typography>
            <Typography variant="title">
              Restaurant# {this.props.restaurant && this.props.restaurant.title}
            </Typography>
          </div>

          <div className="all-evaluations">
            <Typography variant="title">All Evaluations</Typography>
            { evaluations && evaluations.map(this.renderEvaluations.bind(this)) }
            <p className="notice">* hover the color block to see the evaluation date *</p>
          </div>

        </div>

      <div className="evaluation-form">
        <form onSubmit={this.saveRecipe.bind(this)}>
          <Typography variant="title">Daily Evaluation for
            <TextField
              id="evaluationDate"
              type="date"
              className="text-field"
              value={this.state.evaluatedAt}
              InputLabelProps={{
                shrink: true,
              }}
              style={{marginLeft: 10, bottom: 3}}
              onChange={this.updateEvaluatedAt.bind(this)}
              autoFocus
              helperText="Default is set as today!"/>
          </Typography>

          <div className="today-evaluation">
            <div className="color-btns">
              <Tooltip id="tooltip-right" title="bad" placement="right">
                <Button
                  variant="raised"
                  value="R"
                  className={selected ? 'selected' : 'red'}
                  style={{margin:10, borderRadius: 60, height: 85, backgroundColor:"#FF6B6B", color:"#FFFFFF"}}
                  onClick={this.changeColor}>
                  <ThumbDownIcon />
                </Button>
              </Tooltip>

              <Tooltip id="tooltip-right" title="average" placement="right">
                <Button
                  key="yellow"
                  variant="raised"
                  value="Y"
                  className="yellow"
                  style={{margin:10,  borderRadius: 60, height: 85, backgroundColor:"#FFE66D", color:"#FFFFFF" }}
                  onClick={this.changeColor}>
                  <ThumbsUpDownIcon />
                </Button>
              </Tooltip>

              <Tooltip id="tooltip-right" title="good" placement="right">
                <Button
                  variant="raised"
                  value="G"
                  className="green"
                  style={{ margin:10,  borderRadius: 60, height: 85, backgroundColor:"#4ECDC4", color:"#FFFFFF" }}
                  onClick={this.changeColor}>
                  <ThumbUpIcon />
                </Button>
              </Tooltip>
            </div>

            <div className="remark">
              <TextField
                id="remark"
                className="remark"
                label="Remarks"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
                value={ this.state.remark }
                onChange={ this.updateRemark.bind(this) }
                multiline
                rowsMax="8"
                placeholder="Today's remarks"
                fullWidth />
            </div>
          </div>

          <div className="submit-action">
            <Button
              variant="raised"
              className="submit-button"
              color="primary"
              style={{margin:5}}
              onClick={ this.clearRecipe.bind(this) }>DELETE</Button>

            <Button
              variant="raised"
              className="submit-button"
              color="primary"
              style={{margin:5}}
              onClick={ this.editRecipe.bind(this) }>EDIT</Button>

            <Button
              variant="raised"
              className="submit-button"
              color="primary"
              style={{margin:5}}
              onClick={ this.saveRecipe.bind(this) }>SAVE</Button>

            <Button
              variant="raised"
              className="submit-button"
              color="primary"
              style={{margin:5}}
              onClick={this.saveRecipeAndNext.bind(this)}>SAVE & NEXT</Button>
          </div>
        </form>
      </div>
      </Paper>
    )
  }
}

const mapStateToProps = ( { restaurants }, { match }) => ({
  restaurant: restaurants.selectedRestaurant,
  recipe: restaurants.selectedRecipe
})

export default connect(mapStateToProps, {
fetchOneRestaurant,
fetchOneRecipe,
updateRecipe,
clearRecipe,
push,
replace
})(RecipePage)
