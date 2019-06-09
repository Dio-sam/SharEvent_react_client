import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
   
    render() {
        return(
            <div className="container">
            <div className="row">
                <div className="col-lg-12 login-form">
                    <img src="../img/logo.png" width="110" height="110" alt="Logo SharEvent" />
                  
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" value={this.props.email} onChange={(evt) => this.props.onChange({ name: 'email', value : evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" value={this.props.password} onChange={(evt) => this.props.onChange({ name : 'password', value: evt.target.value })}/>
                        </div>
                        <div className="form-group m-4">
                         <button className="btnSubmit" onClick={this.props.onSubmit}>Login</button>
                        </div>
                        {/* <div className="form-group">
                            <a href="#" className="ForgetPwd">Forget Password?</a>
                        </div> */}
                        <div className="form-group">
                            Don't have an account? <Link to="/signup" className="Signup">Click here</Link>
                        </div>
                  
                </div>
            </div>
        </div>
        );
    }
}

export default Login;



