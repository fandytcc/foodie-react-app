import React from 'react'
import PropTypes from 'prop-types'
//material-ui & styling
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

class CheckboxList extends React.Component {
  state = {
    checked: [0],
  }

  handleToggle = value => () => {
    const { checked } = this.state
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    this.setState({
      checked: newChecked,
    })
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  render() {
    if (!this.props.array) return null

    const { classes, array } = this.props

    return (
      <div className={classes.root}>
        <List>
          {array.map(value => (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(value)}
              className={classes.listItem}
              style={{ paddingBottom: 0 }}
            >
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText secondary={this.capitalizeFirstLetter(value)} style={{ fontSize: 20}} />
            </ListItem>
          ))}
        </List>
        <Divider style={{ width: `150%` }}/>
      </div>
    )
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CheckboxList)
