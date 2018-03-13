import React, { PureComponent } from 'react'
import { compose, withProps } from 'recompose'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const amsterdam = { lat: 52.370, lng: 4.895 }

const MyMapComponent = compose(
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

class Map extends PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    console.log(this.props)
    const markers = this.props.markers.map((venue, i) => {
      const marker = {
        position: {
          lat: venue.location.lat,
          lng: venue.location.lng
        },
        label: venue.name
      }

      return <Marker key={i} {...marker} onClick={this.props.onMarkerClick} />
    })

    return (
      <div>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          markers={markers}
        />
      </div>
    )
  }
}
export default Map
