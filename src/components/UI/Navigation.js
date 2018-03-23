import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../../actions/user/sign-out'
//material-ui
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import './Navigation.css'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: 50,
    marginRight: 20,
  },
})

const TITLE = 'FOODIE FAN'

class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  signOut = (event) => {
    event.preventDefault()
    this.props.signOut()
  }

  signUp = () => {
    this.props.push('/sign-up')
  }

  goHome = () => {
    this.props.push('/')
  }

  render() {
    const { signedIn, classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static" className="navbar" style={{boxShadow:'none'}}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="go-home" onClick={this.goHome}>
              <img className="logo-img" src="https://png.icons8.com/color/96/000000/noodles.png" alt="foodie fan" />
            </IconButton>
            <Typography variant="display3" color="inherit" className={classes.flex}>
              {TITLE}
            </Typography>
            { signedIn ?
              <Button className="btn btn-repsonsive" color="inherit" onClick={this.signOut.bind(this)}>Sign Out</Button> : <Button variant="raised" color="secondary" className="btn" onClick={this.signUp}>Sign Up</Button> }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push, signOut }) (withStyles(styles)(Navigation))
