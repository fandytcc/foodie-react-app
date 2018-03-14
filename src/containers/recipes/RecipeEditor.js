import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createRecipe } from '../../actions/restaurants/create'
//material-ui
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import '../restaurants/RestaurantPage.css'

class RecipeEditor extends PureComponent {
  constructor(props) {
    super()

    const { name, photo } = props

    this.state = {
      name,
      photo
    }
  }

  updateName(event) {
    this.setState({
      name: event.target.value
    })
  }

  updatePhoto(event) {
    this.setState({
      photo: event.target.value
    })
  }

  saveRecipe() {
    const recipe = { ...this.state }
    this.props.createRecipe(this.props.restaurantId, recipe)
  }

  render() {
    return (
      <div className="recipe-editor">
        <Typography variant="headline">Create New Recipe</Typography>
        <form onSubmit={this.saveRecipe.bind(this)}>
          <div className="form">
            <TextField
              type="text"
              id="name"
              className="text-field"
              label="Recipe's full name"
              defaultValue={this.state.name}
              onChange={this.updateName.bind(this)}
              onKeyDown={this.updateName.bind(this)}
              margin="normal" />
          </div>

          <div className="form">
            <TextField
              type="URL"
              id="photo"
              className="text-field"
              label="Recipe Photo URL"
              defaultValue={this.state.photo}
              onChange={this.updatePhoto.bind(this)}
              onKeyDown={this.updatePhoto.bind(this)}
              margin="normal" />
          </div>

          <div className="actions">
            <Button
              variant="raised"
              className="primary"
              color="primary"
              onClick={this.saveRecipe.bind(this)}>Create Recipe</Button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = { createRecipe }

export default connect(null, mapDispatchToProps)(RecipeEditor)
