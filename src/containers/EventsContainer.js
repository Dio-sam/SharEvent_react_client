import React from "react";
import { Link } from "react-router-dom";
import Config from "../Config";
import { withUser } from "../user";
import AddEvent from "../components/events/AddEvent";
import Calendar from "../components/calendar/Calendar";
import "react-infinite-calendar/styles.css";
import MapEvent from "../components/map/MapEvent";
import ButtonEvents from "../components/core/ButtonEvents";
import { Spinner } from "react-activity";
import * as moment from "moment";
import Api from "../utils/Api";

class EventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      dateSelected: [],
      isLoading: false,
      isSelected: false,
      isGoEventId: null,
      isGoState: false,
      user:this.props.user.user._id,
      hover: false
    };
    this.addDate = this.addDate.bind(this);
    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
  }
  async componentDidMount() {
    const url = `${Config.HOST_SERVER}/events`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    const events = data.events;
    const dateSelected = [];

    events.forEach(event => {
      //  if (event.hasOwnProperty('isGo') === true) {
      if (event.hasOwnProperty("user") === true) {
        //    if (event.isGo === true) {
        if (event.user != null) {
          dateSelected.push({
            id: event._id,
            date: new Date(new Date(event.start).getTime() - 2 * 3600 * 1000) // fix 2 hours offset from db
          });
        }
      }
    });
    this.setState({
      events,
      dateSelected,
      isLoading: true
    });
    // console.log(this.state.events)
  }

  hoverOn() {
    this.setState({ hover: true });
  }

  hoverOff() {
    this.setState({ hover: false });
  }

  // goEvent(id){
  //   let {isGoState}=this.state;
  //   let {isGoUser}=this.state;
  //   Api.updateEvent(id,isGoUser)
  //   .then(res=>{
  //     this.setState({
  //       // isGoState:!isGoState,
  //       isGoUser:isGoUser,
  //       isGoEventId: id
  //     })
  //   })

  // }
  addDate(date, id, user) {
    console.log(">>>>HOMEthis.state.dateSelected", this.state.dateSelected);
    const newDates = this.state.dateSelected;
    let index = -1;
    // BOUCLE DE VERIFICATION DE PRESENCE D'ID DANS L'ARRAY
    for (var i = 0; i < newDates.length; i++) {
      console.log("forNewdates", newDates[i].id);
      if (newDates[i].id === id) {
        index = i;
      }
    }
    // CONDITIONS DE PUSH ET SPLICE
    if (index === -1) {
      newDates.push({
        date: new Date(new Date(date).getTime() - 2 * 3600 * 1000), // fix 2 hours offset from db
        id: id
      });
      Api.updateEvent(id, this.state.user).then(res => {
        this.setState({
          dateSelected: newDates,
          
        });
      });
    } else {
      console.log('eseeeeeeeeeerrrrr',user,this.props.user.user._id,user === this.props.user.user._id)
      if (user === this.state.user || user===null) {
        newDates.splice(index, 1);
        Api.updateEvent(id).then(res => {
          this.setState({
            dateSelected: newDates,
           
          });
        });
      }
    }
  }

  render() {
    console.log("this.props", this.props);
    console.log("eventsthis", this.state.isSelected);
    console.log("eventsthisisGo", this.state.isGo);
    const events = this.state.events;
    if (events === 0) {
      return (
        <Spinner
          className="spinner"
          color="#191102"
          size={30}
          speed={1}
          animating={true}
        />
      );
    }
    console.log(events);
    const { isLoading } = this.state;
    if (!isLoading) {
      return (
        <Spinner
          className="spinner"
          color="#191102"
          size={30}
          speed={1}
          animating={true}
        />
      );
    }
    // console.log(`${Config.HOST_PICTURE}public/${events[0].picture}`);
    return (
      <div>
        <button
          type="button"
          className="btn btn-info"
          data-toggle="modal"
          data-target="#ModalFeedback"
        >
          <i className="fas fa-folder-plus" /> Add Event
        </button>
        <div
          className="modal fade"
          id="ModalFeedback"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg text-center" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ModalLabel">
                  Add Event
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <AddEvent />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div
            onMouseEnter={this.hoverOn}
            onMouseLeave={this.hoverOff}
            className="row"
          >
            <div className="col-sm-8 col-md-8 col-lg-8">
              <h2 className="text-center m-4 titleStyle">
                <i className="fas fa-calendar-day" /> Find your Event
              </h2>
              {events.map((event, index) => {
                const dateSelected = this.state.dateSelected.map(
                  d => moment(d.date).format("YYYY-MM-DDTHH:mm:ss.sss") + "Z"
                );
                const isSelected = dateSelected.includes(event.start);
                console.log("isSelected", isSelected);
                console.log("dateSelected", dateSelected);
                console.log("event.start", event.start);
                return (
                  <div key={index}>
                    <div className="row borderStyle">
                      <div className="col-md-4 imageBlock">
                        <img
                          className="d-flex align-self-start"
                          src={`${Config.HOST_PICTURE}${event.picture}`}
                          alt={event.name}
                        />
                      </div>
                      <div className="col-md-8 card-body">
                        <div className="titleEvents">{event.name}</div>
                        <ul className="list-unstyled listStyle">
                          <li>
                            <i className="fas fa-calendar-day" />{" "}
                            {moment(event.start).format("DD/MM/YYYY HH:mm")}{" "}
                            {event.time_start}
                          </li>
                          <li>
                            <i className="fas fa-map-marker-alt" />{" "}
                            {event.address}
                          </li>
                        </ul>
                        <Link
                          to={{
                            pathname: `/events/${event._id}`,
                            state: event
                          }}
                          style={{ color: "#5D5D5D", fontSize: 18 }}
                        >
                          <i className="fas fa-info-circle" /> Discover
                        </Link>
                        <ButtonEvents
                          onClick={() => {
                            this.addDate(event.start, event._id, event.user);
                            // this.goEvent(event._id);
                          }}
                        >
                          {isSelected ? "Unsubscribe" : "Register"}
                        </ButtonEvents>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 mt-5">
              <div className="scrollEvent">
                <Calendar
                  events={this.state.events}
                  dateSelected={this.state.dateSelected.map(d => d.date)}
                />
                <div style={{ marginTop: 20 }}>
                  <MapEvent
                    style={{ maxWidth: 400 }}
                    events={this.state.events}
                    hover={this.state.hover}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withUser(EventsContainer);
