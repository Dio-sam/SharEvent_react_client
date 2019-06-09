import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./MarkerEvent";
 

class MapEvent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      allvents : [],
    }
  }

render() {

  const events = this.props.events;

  return (
    <div style={{ height: 500, width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCftHO9ya591q_7ihe5i4gPHtsWGVfw1pg" }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >

      {events.map((event, index) => {
        // console.log("map", event)
        return(  <Marker
          key={index}
          lat={event.location.lat}
          lng={event.location.lng}
          hover={this.props.hover}
        />)
    })}

      </GoogleMapReact>
    </div>
    );
  }
}


MapEvent.defaultProps = {
  center: {
    lat: 48.8534,
    lng:  2.3488,
  },
  zoom: 12
}

export default MapEvent;