import React from "react";
import Api from "../../utils/Api";
import { withUser } from "../../user";
import { withRouter } from "react-router-dom";
import { Link } from "@material-ui/core";

class AddShared extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      contacts: [],
      idea1: "",
      idea2: "",
      idea3: "",
      name_society: "",
      name_contact: "",
      phone: "",
      summarize: ""
    };
  }

  onAddInput() {
    const input = {
      name_society: this.state.name_society,
      name_contact: this.state.name_contact,
      phone: this.state.phone
    };
    const newInput = this.state.contacts;
    newInput.push(input);
    this.setState({
      contacts: newInput
    });
  }

  createInput() {
    console.log('iiiiiiiiiii',this.state.contacts);
    return this.state.contacts.map((contact, i) => (
      <div key={i}>
        <input
          type="text"
          className="form-control m-2"
          placeholder="Company Name"
          value={contact.name_society}
          onChange={evt =>
            this.onChangeContact(
              { name: "name_society", value: evt.target.value },
              i
            )
          }
        />
        <input
          type="text"
          className="form-control m-2"
          placeholder="Contact"
          value={contact.name_contact}
          onChange={evt =>
            this.onChangeContact(
              { name: "name_contact", value: evt.target.value },
              i
            )
          }
        />
        <input
          type="text"
          className="form-control m-2"
          placeholder="Phone Number"
          value={contact.phone}
          onChange={evt =>
            this.onChangeContact({ name: "phone", value: evt.target.value }, i)
          }
        />
        <Link
          style={{ cursor: "pointer" }}
          onClick={this.removeClick.bind(this, i)}
        >
          <i className="fas fa-trash-alt" />
        </Link>
      </div>
    ));
   
  }

  onChangeContact({ name, value }, index) {
    const newContacts = this.state.contacts;
    newContacts[index][name] = value;
    this.setState({
      contacts: newContacts
    });
    console.log('oooooooooo',this.state.contacts)
  }

  removeClick(i) {
    let contacts = [...this.state.contacts];
    contacts.splice(i, 1);
    this.setState({ contacts });
  }

  onChangeIdeas() {
    const newIdeas = {
      idea1: this.state.idea1,
      idea2: this.state.idea2,
      idea3: this.state.idea3
    };
    this.setState({
      main_ideas: newIdeas
    });
  }

  onChangeInput({ name, value }) {
    this.setState({
      [name]: value
    });
  }

  saveShare() {
    const { files, contacts, idea1, idea2, idea3, summarize } = this.state;
    const { user } = this.props.user;
    const { _id } = this.props.informations;
    let data = new FormData();
    console.log('sssssssssssssffff',files,typeof files)
    for (const file of files) {
      data.append("files", file);
      console.log('sssssssssssssffff',file,typeof file)
    }
    data.append("main_ideas", JSON.stringify({ idea1, idea2, idea3 }));
    data.append("contacts", JSON.stringify(contacts));
    data.append("summarize", summarize);
    Api.postShare(data, user, _id).then(res => {
      console.log("res", res);
      if (res.error) {
        alert(res.error);
      } else {
        this.props.history.push("/home");
      }
    });
  }

  render() {
    console.log("id#saveEvent", this.props);
    const { idea1, idea2, idea3, summarize } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="shareFiles" className="font-weight-bold">
                    Load event files
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="shareFiles"
                    multiple
                    onChange={evt =>
                      this.onChangeInput({
                        name: "files",
                        value: evt.target.files
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Contact" className="font-weight-bold">
                    Person or Company encountered
                  </label>
                  {this.createInput()}
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={this.onAddInput.bind(this)}
                  >
                    {' '}
                    <i className="fas fa-plus-circle" />
                  </Link>
                </div>
              </div>

              <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="mainIdeas" className="font-weight-bold">
                    Give 3 Main Ideas
                  </label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="mainIdeas"
                    placeholder="First idea"
                    value={idea1}
                    onChange={evt =>
                      this.onChangeInput({
                        name: "idea1",
                        value: evt.target.value
                      })
                    }
                  />
                  <input
                    type="text"
                    className="form-control m-2"
                    id="mainIdeas"
                    placeholder="Second idea"
                    value={idea2}
                    onChange={evt =>
                      this.onChangeInput({
                        name: "idea2",
                        value: evt.target.value
                      })
                    }
                  />
                  <input
                    type="text"
                    className="form-control m-2"
                    id="mainIdeas"
                    placeholder="Third idea"
                    value={idea3}
                    onChange={evt =>
                      this.onChangeInput({
                        name: "idea3",
                        value: evt.target.value
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="summarize" className="font-weight-bold">
                    Summarize
                  </label>
                  <textarea
                    className="form-control"
                    id="summarize"
                    rows="3"
                    value={summarize}
                    onChange={evt =>
                      this.onChangeInput({
                        name: "summarize",
                        value: evt.target.value
                      })
                    }
                  />
                </div>
                <button
                  data-dismiss="modal"
                  type="button"
                  className="btn btn-info"
                  onClick={() => this.saveShare()}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withUser(AddShared));
