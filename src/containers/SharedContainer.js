import React from "react";
import Config from "../Config";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import ShareInfo from "../components/shared/ShareInfo";
import { withUser } from "../user";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import * as moment from "moment";

class SharedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      sharedFiles: []
    };
  }

  componentDidMount() {
    const url = `${Config.HOST_SERVER}/shares`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        return (
          console.log("data", data),
          this.setState({
            isLoading: true,
            sharedFiles: data.data
          })
        );
      });
  }

  render() {
    const { isLoading, sharedFiles } = this.state;
    console.log("thisstate#sharedfiles", sharedFiles);
    if (sharedFiles === 0) {
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
    return (
      <div className="container">
        <div className="btnBack m-5">
          <Link to="/home" style={{ color: "#4C4B63" }}>
            <i className="fas fa-arrow-circle-left" /> Back
          </Link>
        </div>
        <div className="row">
          <div style={{ width: "100%", marginTop: 30 }}>
            {sharedFiles.map(sharedfile => {
              return (
                <table className="table" key={sharedfile._id}>
                  <thead>
                    <tr>
                      <th>Who Upload ?</th>
                      <th>Event</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ShareInfo id={sharedfile._id} />
                  </tbody>
                  <Accordion>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>Discover</AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <table>
                          <thead>
                            <tr>
                              <th>Contact</th>
                              <th>Main Ideas</th>
                              <th>Summarize</th>
                              <th>File Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {sharedfile.contacts.map((contact, index) => {
                                  return (
                                    <ul key={index}>
                                      <li>
                                        <span className="font-weight-bold">
                                          Society:
                                        </span>
                                        <p>{contact.name_society}</p>
                                      </li>
                                      <li>
                                        <span className="font-weight-bold">
                                          Person:
                                        </span>
                                        <p>{contact.name_contact}</p>
                                      </li>
                                      <li>
                                        <span className="font-weight-bold">
                                          Phone Number:
                                        </span>
                                        <p>{contact.phone}</p>
                                      </li>
                                    </ul>
                                  );
                                })}
                              </td>
                              <td>
                                <ul>
                                  <li>
                                    <span className="font-weight-bold">
                                      First:
                                    </span>
                                    <p>{sharedfile.main_ideas.idea1}</p>
                                  </li>
                                  <li>
                                    <span className="font-weight-bold">
                                      Second:
                                    </span>
                                    <p>{sharedfile.main_ideas.idea2}</p>
                                  </li>
                                  <li>
                                    <span className="font-weight-bold">
                                      Third:
                                    </span>
                                    <p>{sharedfile.main_ideas.idea3}</p>
                                  </li>
                                </ul>
                              </td>
                              <td>{sharedfile.summarize}</td>

                              <td>
                                {sharedfile.files.map((file, index) => {
                                  return (
                                    <div key={index}>
                                      <button
                                        type="button"
                                        className="btn btn-info m-1"
                                      >
                                        <a
                                          href={`${Config.HOST_PICTURE}${file}`}
                                          style={{
                                            color: "#fff",
                                            textDecoration: "none"
                                          }}
                                        
                                        >
                                          Open
                                        </a>
                                      </button>
                                    </div>
                                  );
                                })}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </table>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(withUser(SharedContainer));
