// src/App.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from './components/UI/Navigation'
// import Routes from './routes' <Route />
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from './styles/theme'
// import Map from './components/Map'
// import Places from './components/Places'
// import { PlacesWithStandaloneSearchBox } from './components/SearchBar'
// import { Marker } from 'react-google-maps'

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
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
