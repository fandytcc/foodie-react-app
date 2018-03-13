// src/App.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from './components/UI/Navigation'
// import Routes from './routes' <Route />
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from './styles/theme'
import Map from './components/Map'
import Places from './components/Places'
import { PlacesWithStandaloneSearchBox } from './components/SearchBar'
import { Marker } from 'react-google-maps'
import superagent from 'superagent'

class App extends Component {
  constructor(){
    super()
    this.state = {
      venues: []
    }
  }
  static childContextTypes = {
    createMuiTheme: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { createMuiTheme }
  }

  componentDidMount() {
    const url = 'https://api.foursquare.com/v2/venues/search?v=20180306&ll=52.3702,4.8952&query=food&client_id=22I530SVNOJBUZT245DJGRBYYM0GRMZEQSOYMLNC2Q2JUJ2L&client_secret=WPZUQLMGNPI2BCYYM2M4VX2OAEAYSSNMJPUX1YBN2FYWDHIJ'

    superagent
    .get(url)
    .query(null)
    .set('Accept', 'text/json')
    .end((error, response) => {

      const venues = response.body.response.venues
      console.log(JSON.stringify(venues))
      this.setState({
        venues: venues
      })
    })
  }

  render() {
    console.log(this.state)
    const amsterdam = { lat: 52.370, lng: 4.895 }

    return (
      <MuiThemeProvider theme={createMuiTheme}>
        <div className="App">
          <Navigation />

          <div style={{width:`35%`, float:'left', margin:20}}>
            <Map center={amsterdam} markers={this.state.venues} />
          </div>
          <Places venues={this.state.venues}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
