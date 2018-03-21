import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Routes from './routes'
import Navigation from './components/UI/Navigation'
//material-ui & styling
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from './styles/theme'
import './App.css'
// import { PlacesWithStandaloneSearchBox } from './components/SearchBar'

class App extends Component {

  static childContextTypes = {
    createMuiTheme: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { createMuiTheme }
  }

  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme}>
        <div className="App">
          <Navigation />
          <Routes />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
