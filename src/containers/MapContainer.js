import React, { PureComponent } from 'react'
import { Marker } from 'react-google-maps'
import { MyMapComponent } from '../components/Map'

class MapContainer extends PureComponent {
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

  renderMarker(marker, i) {
    return <Marker key={i} { ...marker } />
  }

  render() {
    const markers = this.props.markers.map((venue, i) => {
      const marker = {
        position: {
          lat: venue.location[0],
          lng: venue.location[1]
        },
        label: venue.name
      }

      return this.renderMarker(marker, i)
    })

    return (
      <div className="map-container">
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          markers={markers}
        />
      </div>
    )
  }
}

export default MapContainer
