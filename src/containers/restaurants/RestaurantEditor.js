import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createRestaurant } from '../../actions/restaurants/create'
import Title from '../../components/UI/Title'
//material-ui & styling
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import './RestaurantEditor.css'

const style = {
  height: 350,
  width: 350,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};

class RestaurantEditor extends PureComponent {
  constructor(props) {
    super()

    const { title, startDate, endDate } = props

    this.state = {
      title,
      startDate,
      endDate,
    }
  }

  updateTitle(event) {
    this.setState({
      title: event.target.value
    })
  }

  updateStartDate(event, date) {
    this.setState({
      startDate: date
    })
  }

  updateEndDate(event, date) {
    this.setState({
      endDate: date
    })
  }

  saveRestaurant() {
    const restaurant = { ...this.state }
    this.props.createRestaurant(restaurant)
  }

  render() {
    return (
      <Paper className="editor" style={style} elevation={2}>
        <Title content="Create New Restaurant: " />

        <form onSubmit={this.saveRestaurant.bind(this)} className="container">
          <div className="form" style={{margin: 20}}>
            <TextField
              id="title"
              className="text-field"
              label="Restaurant Number"
              value={this.state.title}
              onChange={this.updateTitle.bind(this)}
              margin="dense"
              autoFocus
              fullWidth />

            <TextField
              id="startDate"
              label="Start date"
              type="date"
              className="text-field"
              defaultValue={this.state.startDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.updateStartDate.bind(this)}
              onKeyDown={this.updateStartDate.bind(this)}
              margin="dense"
              autoFocus
              fullWidth />

            <TextField
              id="endDate"
              label="End date"
              type="date"
              className="text-field"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={this.state.endDate}            onChange={this.updateEndDate.bind(this)}
              onKeyDown={this.updateEndDate.bind(this)}
              margin="dense"
              autoFocus
              fullWidth />
          </div>

          <div className="actions" style={{margin: 10}}>
            <Button
              variant="raised"
              className="primary"
              color="primary"
              onClick={this.saveRestaurant.bind(this)}>
            Create Restaurant
            </Button>
          </div>

        </form>
      </Paper>
    )
  }
}

const mapDispatchToProps = { createRestaurant }

export default connect(null, mapDispatchToProps)(RestaurantEditor)
