import React from "react"

class ButtonEvents extends React.Component {

render(){
    return(
      <div >
      <button className="btn btn-info" style={{ marginLeft: "40%" }} onClick = {this.props.onClick}>{this.props.children}</button>
    </div>
    );
  }
}

export default ButtonEvents; 