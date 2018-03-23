import React, { PureComponent } from 'react'
import { PlacesWithStandaloneSearchBox } from '../components/SearchBar'
//material-ui & styling
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import './Homepage.css'

class Homepage extends PureComponent {
  render() {
    return (
      <article className="home-container">
        <section className="search-container">
          <div className="search-bar">
            <PlacesWithStandaloneSearchBox />
            <Button
              variant="raised"
              color="secondary"
              style={{
                height: 70,
                borderTopRightRadius: `40px`,
                borderBottomRightRadius: `40px`,
                fontSize: 24,
                display: `flex`,
              }}>
              Search
            </Button>
          </div>
        </section>

        <main className="type-container">
          <section className="type-wrapper">
            <Typography variant="display1" color="inherit">
              Breakfast
            </Typography>
          </section>
          <section className="type-wrapper">
            <Typography variant="display1" color="inherit">
              Lunch
            </Typography>
          </section>
          <section className="type-wrapper">
            <Typography variant="display1" color="inherit">
              Dinner
            </Typography>
          </section>
          <section className="type-wrapper">
            <Typography variant="display1" color="inherit">
              Cafe
            </Typography>
          </section>
          <section className="type-wrapper">
            <Typography variant="display1" color="inherit">
              Dessert
            </Typography>
          </section>
        </main>
      </article>
    )
  }
}

export default Homepage
