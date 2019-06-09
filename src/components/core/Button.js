import React from "react" 

class Button extends React.Component {
  render(){
    return(
      <div className="btn-group">
        <button className="btn btnTab" style={{ width: 350 }} onClick={this.props.onClick}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default Button;