import React from "react";
// import Parser from 'html-react-parser';
import Config from '../Config'
import Nav from '../components/navigation/Nav';
import Map from "../components/map/Map";
import {withUser} from "../user";
import { Spinner } from 'react-activity';
import { Link } from 'react-router-dom';
import AddShared from '../components/shared/AddShared';
import * as moment from 'moment';


class EventContainer  extends React.Component {
 constructor(props) {
  super(props)
  this.state= {
   informations : {}
  }
 }

  async componentDidMount() {
    console.log("this.props",this.props)
    const url = `${Config.HOST_SERVER}/events/${this.props.match.params.id}`
    console.log(url)
    const res = await fetch(url) 
    const data = await res.json();
      this.setState({
        informations : data.event
      })
      // console.log(this.state.informations)
    }

renderList(){
 const {informations}=this.state
  if (informations.is_free === true) {
    return (
      <p>
      <i className="fas fa-money-bill-wave"></i> Free
      </p>
  )}
  else {
    return (
      <p>
        <i className="fas fa-money-bill-wave"></i> Paying
      </p>
    )
  }
}
addFeedBack(){
  const { informations } = this.state;
  const {user}=this.props.user;
  if(informations.user===user._id){
    return (
      <button type="button" className="btn btn-info mb-3" data-toggle="modal" data-target="#ModalFeedback">
        <i className="fas fa-folder-plus"></i> Add feedback
      </button>
    )
  }
}

render(){
  const { informations } = this.state
  
  if(Object.keys(informations).length === 0){ 
    return(
      <div>
        <Spinner className="spinner" color="#191102" size={30} speed={1} animating={true} />
      </div>
    )
  }

  return (
    <div>
    <Nav />
    <div className="btnBack m-5">
      <Link to="/home" style={{ color: "#4C4B63" }}><i className="fas fa-arrow-circle-left"></i> Back</Link>
    </div>
    <div className="container">
      <div className="row">
       {this.addFeedBack()}
        <div className="modal fade" 
          id="ModalFeedback" 
          tabIndex="-1" role="dialog" 
          aria-labelledby="ModalLabel" 
          aria-hidden="true">
          <div className="modal-dialog modal-lg text-center" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ModalLabel">{informations.name}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div className="modal-body">
                <AddShared {...this.state}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <ul className="event-list">
            <li>
              <p className="title">{informations.name}</p>
              <div className="row">
                <div className="col-lg-6 col-sm-12">
                  <img style={{
                    maxWidth:400,
                    }}
                    className="img-fluid mx-auto"
                    src={`${Config.HOST_PICTURE}${informations.picture}` }alt="Logo Event" />
                </div>
         
                <div className="col-lg-6 col-sm-12">
                  <div className="info">
                    <p>
                      <i className="fas fa-calendar-day"></i> {moment(informations.start).format('DD/MM/YYYY HH:mm')} to {moment(informations.end).format('DD/MM/YYYY HH:mm')}
                    </p>
                    <p>
                      <i className="fas fa-map-marker-alt"></i> {informations.address} 
                    </p>            
                    {this.renderList()}
                  </div>
                  </div>
                </div>
                <div className="card-footer">
                  <a href={informations.url} target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt"></i> Get your Ticket</a>
                </div>
            </li>
          </ul>
        </div>
       
        <div className="col-12 mb-5">
          <Map style={{ maxWidth:300 }} location={informations.location} />
        </div>
          <p className="content">{informations.description}</p>
        </div>
      </div>
    </div>
    );
  }
}


export default withUser(EventContainer) ;