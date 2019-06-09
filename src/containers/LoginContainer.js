import React from 'react';
import Api from '../utils/Api';
import Login from '../components/core/Login';

class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        
      }
    
      onSubmit() {
        const {
          email,
          password
        } = this.state;
    console.log("this.props",this.props);
    console.log("this.state",this.state);
    console.log("api",Api);
        Api.login({
          email,
          password
        })
        .then((res) => {
          console.log('res', res);
          if (res.error) {
            alert(res.error);
          } else {
            Api.setUser(res);
            this.props.history.push("/home");
          }
        });
      }
    
      onChange({ name, value }) {
        this.setState({
          [name]: value
        })
      }

    render() {
        return(
            <Login {...this.state} onSubmit={this.onSubmit} onChange={this.onChange} />
        );
    }
}

export default LoginContainer;