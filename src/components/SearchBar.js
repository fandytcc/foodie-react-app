import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs } from 'react-google-maps'
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox'

export const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC3fkI5cmZi2jtO5ejOB08GNoczGHHZPGA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height:`200px` }} />,
  }),
  lifecycle({
    componentWillMount(){
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          ref.searchBox = ref
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces()

          this.setState({
            places,
          })
        },
      })
    },
  }),
  withScriptjs
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="amsterdam-zuid, amsterdam centraal, amsterdam-noord.."
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `50%`,
          height: `45px`,
          padding: `0 20px`,
          borderTopLeftRadius: `40px`,
          borderBottomLeftRadius: `40px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.1)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
    <ol>
      {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
        <li key={place_id}>
          {formatted_address}
          {" at "}
          ({location.lat()}, {location.lng()})
        </li>
      )}
    </ol>
  </div>
)
