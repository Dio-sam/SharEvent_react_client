import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProfileContainer from "./containers/ProfileContainer";
import LoginContainer from "./containers/LoginContainer";
import SignupContainer from "./containers/SignupContainer ";
import HomeContainer from "./containers/HomeContainer";
import SharedContainer from "./containers/SharedContainer";
import EventContainer from "./containers/EventContainer";
import Cookies from "js-cookie";
import Api from "./utils/Api";
import "./styles/bootstrap.min.css";
import "./styles/style.css";

class App extends React.Component {
  componentWillMount() {
    const user = Cookies.getJSON("user");
    if (user) {
      Api.setUser(user);
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={LoginContainer} />
          <Route path="/signup" exact component={SignupContainer} />
          <Route path="/home" exact component={HomeContainer} />
          <Route path="/events/:id" component={EventContainer} />
          <Route path="/shared" component={SharedContainer} />
          <Route path="/profile" component={ProfileContainer} />
        </Router>
      </div>
    );
  }
}

export default App;
