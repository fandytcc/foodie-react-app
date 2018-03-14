import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { restaurantShape } from './RestaurantPage'
//material-ui
import Title from '../../components/UI/Title'
import Paper from 'material-ui/Paper'

//style Paper
const style = {
  height: 250,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
}

class RestaurantItem extends PureComponent {
  static propTypes = {
    ...restaurantShape.isRequired,
}

  render() {
    const { _id, title, recipes, startDate, endDate } = this.props
    const startDateString = (new Date(startDate)).toDateString()
    const endDateString = (new Date(endDate)).toDateString()

    return (
      <Paper className="RestaurantItem" style={style} elevation={2}>
        <Link to={`/restaurants/${_id}`}>
          <Title content={`Restaurant #${title}`} className="level-2" />
        </Link>
        <div style={{textAlign: 'center'}}>
          <p>{ recipes.length } recipes</p>
          <p>Start Date: { startDateString } </p>
          <p>End Date: { endDateString } </p>
        </div>
      </Paper>
    )
  }
}

export default RestaurantItem
