import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/navigation/Nav';
import FuturEvents from '../components/events/futurEvents';
import EventsVisited from '../components/events/eventsVisited';
import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import  Api from '../utils/Api';
import * as moment from 'moment';
import {withUser} from '../user'


class ProfileContainer  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            profile:{}
        }
    }

    componentDidMount() {
        const {user}=this.props;
        console.log(" componentDidMount#user",user);
        this.getProfil(user);
        this.setState({
            isLoading: true
        })
    }
    getProfil(user){
        Api.getProfile(user)
          .then((profile)=>{
            return(
              console.log('profil#getProfil',profile),
              this.setState({
                profile
              })
            )
          })
      }

    render() {
        const { isLoading, profile } = this.state;
        console.log('profil#render',profile);
        console.log('profil#render',this.props);

        
        if(!isLoading) {
            return <Spinner className="spinner" color="#191102" size={30} speed={1} animating={true} />
        }
            return(
                <div>
                    <Nav />
                    <div className="btnBack m-5">
                        <Link to="/home" style={{ color: "#4C4B63", marginRight: 100 }}><i className="fas fa-arrow-circle-left"></i> Back</Link>
                    </div>
                    <div className="container" style={{ marginBottom: 90, justifyContent: "center" }}>
                        <div className="row">
                            <div className="col-md-6 col-sm-6 imgProfile">
                                <img src={`http://localhost:3002/${profile.photo}`} className="imgProfile img-fluid" alt="Profile" />
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-lg-12 details">
                                    <blockquote>
                                        <h5>{profile.firstName} {profile.lastName}</h5>
                                        <cite><i className="fas fa-birthday-cake"></i> {moment(profile.birthday).format('DD/MM/YYYY')}</cite>
                                    </blockquote>
                                    <p>
                                        <i className="fas fa-mobile-alt"></i> {profile.phone}
                                    </p>
                                    <p>
                                        <i className="fas fa-at"></i> {profile.email}
                                    </p>
                                </div>
                            </div>

                            <EventsVisited id={this.props.user.user._id} />
                            <FuturEvents  id={this.props.user.user._id}/> 
                            
                        </div>
                        
                    </div>
                </div>
            );
        
    }
}

export default withUser(ProfileContainer );