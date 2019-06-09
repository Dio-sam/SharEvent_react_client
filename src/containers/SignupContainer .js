import React from 'react';
import Api from '../utils/Api';
import {withRouter} from 'react-router-dom';

class SignupContainer  extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username: '',
      firstName:'',
      lastName:'',
      photo: '', 
      birthday: '',
      phone:'',
      password:''
    }
  }

  onSubmit() {
    const {
      username,
      firstName,
      lastName,
      photo, 
      birthday,
      phone,
      password
    } = this.state;

  // console.log("this.props",this.props);
  // console.log("this.state",this.state);
  // console.log("api",Api);
  // console.log('id#saveEvent#this.state',this.state);
  
  let data=new FormData();
  data.append('password', password);
  data.append('phone', phone);
  data.append('birthday', birthday);
  data.append('photo', photo);
  data.append('lastName', lastName);
  data.append('firstName', firstName);
  data.append('email', username);
    Api.signup(data)
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
   
  onChangeFiles(files) {
    this.setState({
      photo: files
    })
  }

  render() {
    const {
      username,
      firstName,
      lastName,
      birthday,
      phone,
      password
    } = this.state;
    return(
      <div className="container">
        <div className="row">
          <div className="col-12 signup-form">
            <img src="../img/logo.png" width="110" height="110" className="mx-auto" alt="Logo SharEvent" />
            <form>
              <div className="row" style={{ marginLeft: 35 }}>
                <div className="col-lg-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="ImageProfile">Profile Photo</label>
                    <input type="file" className="form-control-file" id="ImageProfile" onChange={(evt) => this.onChangeFiles( evt.target.files[0] )}/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Email" value={username} onChange={(evt) => this.onChange({ name: 'username', value : evt.target.value })} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={(evt) => this.onChange({ name: 'firstName', value : evt.target.value })} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={(evt) => this.onChange({ name: 'lastName', value : evt.target.value })} />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12" style={{ marginTop: 25 }}>
                  <div className="form-group">
                    <input type="date" className="form-control" placeholder="Date of Birth" value={birthday} onChange={(evt) => this.onChange({ name: 'birthday', value : evt.target.value })} />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(evt) => this.onChange({ name: 'password', value : evt.target.value })} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Phone" value={phone} onChange={(evt) => this.onChange({ name: 'phone', value : evt.target.value })} />
                  </div>
                  {/* <div className="form-group">
                    <input type="password" className="form-control" placeholder="Confirm Password" />
                  </div> */}
                  <div className="form-group">
                    <input type="button" className="btnSubmit" value="Register" onClick={()=>this.onSubmit()} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(SignupContainer );