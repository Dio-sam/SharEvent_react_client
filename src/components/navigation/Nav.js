import React from 'react';
import { Link } from 'react-router-dom';
import {withUser} from '../../user';
import Api from '../../utils/Api';
class Nav extends React.Component {
    onClick(){
        Api.logout()
    }
    render() {
        return(
            <nav className="navbar navbar-expand-lg">
                    <Link className="navbar-brand mx-auto" to="/home">
                        <img src="../img/logo.png" width="90" height="80" className="d-inline-block align-top" alt="Logo SharEvent"/>
                    </Link>
                <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-right" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                        <Link className="nav-item nav-link" to="/profile"><i className="fas fa-user-circle"></i> Profile</Link>
                        <Link onClick={()=>this.onClick()} className="nav-item nav-link" to="/"><i className="fas fa-sign-out-alt"></i> Logout</Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withUser(Nav);