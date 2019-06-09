import React from "react";
import Nav from "../components/navigation/Nav";
import EventsContainer from "./EventsContainer";
import SharedContainer from "./SharedContainer";
import NewsContainer from "./NewsContainer";
import Button from "../components/core/Button";
import { withRouter } from "react-router-dom";
import Chat from "../components/chat/Chat";

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "events"
    };
    this.onActiveTab = this.onActiveTab.bind(this);
  }

  onActiveTab(activeTab) {
    this.setState({
      activeTab
    });
  }

  render() {
     console.log('Home#propspppppppppppppppppppppp',this.props);
    return (
      <div>
        <Nav />
        <div className="container-fluid">
          <div className="row m-5">
            <div className="col-lg-12">
              <div style={{ marginBottom: 25, textAlign: "center" }}>
                <Button onClick={() => this.onActiveTab("events")}>
                  <i className="fas fa-calendar-alt" /> Events
                </Button>
                <Button onClick={() => this.onActiveTab("shared")}>
                  <i className="fas fa-share-alt-square" /> Shared
                </Button>
                <Button onClick={() => this.onActiveTab("news")}>
                  <i className="fas fa-newspaper" /> News
                </Button>
              </div>
              {this.state.activeTab === "events" && (
                <EventsContainer {...this.props} />
              )}
              {this.state.activeTab === "shared" && <SharedContainer />}
              {this.state.activeTab === "news" && <NewsContainer />}
            </div>
          </div>
        </div>
        <Chat />
      </div>
    );
  }
}

export default withRouter(HomeContainer);
