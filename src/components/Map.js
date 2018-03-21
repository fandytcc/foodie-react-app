import React from 'react'
import { compose, withProps } from 'recompose'
import { withGoogleMap, GoogleMap } from 'react-google-maps'

const amsterdam = { lat: 52.370, lng: 4.895 }

export const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC3fkI5cmZi2jtO5ejOB08GNoczGHHZPGA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height:`1000px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: amsterdam,
  }),
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={props.center}
  >
    {props.isMarkerShown && props.markers}
  </GoogleMap>
)
