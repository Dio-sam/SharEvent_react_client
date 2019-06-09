import React from "react";
// const AnyReactComponent = ({ text }) => <div style={{ color: "#17A2B8" }}>{text}</div>;

class Marker extends React.Component {
 render() {
   return(
    <div style={{fontSize: 35,
     color : this.props.hover ? "#17A2B8" : "black"
    }}>
      <i className="fas fa-map-pin"></i>
    </div>
  );
 }
}

export default Marker;