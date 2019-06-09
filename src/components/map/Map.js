import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker"

class Map extends React.Component {
  
render() {
    //console.log("mapProps", this.props.event.venue_id)
    //console.log("Map#thispropslocation", this.props.location)

    const { location, name } = this.props;

    return (
      <div style={{ height: 495, width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCftHO9ya591q_7ihe5i4gPHtsWGVfw1pg" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        <Marker
          name={name}
          lat={location.lat}
          lng={location.lng}
        />
        </GoogleMapReact>
      </div>
    );
  }
}

Map.defaultProps = {
  center: {
    lat: 48.8534,
    lng:  2.3488,
  },
  zoom: 12
}

export default Map;