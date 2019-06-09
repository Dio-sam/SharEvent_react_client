import React from "react";
const AnyReactComponent = ({ text }) => <div style={{ fontSize: 30, color: "#17A2B8" }}>{<i className="fas fa-map-pin"></i>}</div>;

class EventMarker extends React.Component {
  render() {

    return(
      <AnyReactComponent 
         text={this.props.name}
      />
   );
  }
}

export default EventMarker; 