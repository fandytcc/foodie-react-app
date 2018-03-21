import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { PlacesWithStandaloneSearchBox } from '../components/SearchBar'
//styling
import './Homepage.css'

class Homepage extends PureComponent {
  render() {
    return (
      <div className="home-wrapper">
        <div className="top-box">
          <div className="search-bar">
            <PlacesWithStandaloneSearchBox />
          </div>
        </div>

        <div className="restaurants-type">
          <ul>
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
            <li>Cafe</li>
            <li>Dessert</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Homepage
