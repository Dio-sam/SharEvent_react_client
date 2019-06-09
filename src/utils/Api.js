import Cookies from "js-cookie";
import Config from "../Config";

class Api {
  constructor() {
    // Create the basic user
    this.user = Object.assign({}, this.defaultUser);
  }
  defaultUser = {
    _id: null,
    token: null,
    username: null,
    firstName: null,
    lastName: null,
    photo: null,
    birthday: null,
    phone: null
  };

  setUser(user) {
    console.log("setUser", this.user);
    this.user = user;
  }

  getUser() {
    console.log("getUser", this.user);
    return this.user;
  }
  isAuthenticated() {
    console.log("this.user._id", this.user);
    if (this.user) {
      return true;
    }
    return false;
  }
  authenticate(user) {
    console.log("authenticate#user", user);
    Cookies.set("user", user);
    this.setUser(user);
  }
  signup(user) {
    const options = {
      method: "POST",
      body: user,
      // If you add this, upload won't work
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=--------------------------601840134860318406757758"
      }
    };
    delete options.headers["Content-Type"];
    return fetch(`${Config.HOST_SERVER}/signup`, options)
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          this.authenticate(json);
        }
        return json;
      });
  }

  login(user = {}) {
    console.log("url", `${Config.HOST_SERVER}/login`);
    return fetch(`${Config.HOST_SERVER}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          this.authenticate(json);
        }
        console.log("json", json);
        return json;
      });
  }
  logout() {
    Cookies.remove("user");
    this.setUser(Object.assign({}, this.defaultUser));
  }
  // Compulsory authentication on this route
  getProfile(profile = {}) {
    console.log(`profile`, profile);
    return new Promise((resolve, reject) => {
      console.log("this.isAuthenticated()", this.isAuthenticated());
      if (this.isAuthenticated()) {
        console.log("(this.user.token", profile);
        console.log(`${Config.HOST_SERVER}/users/${profile.user._id}`);
        return fetch(`${Config.HOST_SERVER}/users/${profile.user._id}`, {
          headers: {
            Authorization: `Bearer ${profile.user.token}`
          }
        })
          .then(res => res.json())
          .then(json => {
            resolve(json);
          });
      }
      reject({
        error: "You must be authenticated"
      });
    });
  }
  postEvent(event) {
    console.log("event #postevent", event);
    console.log(
      "url #postevent",
      `${Config.HOST_SERVER}/events`
    );
    const options = {
      method: "POST",
      body: event,
      // If you add this, upload won't work
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=--------------------------601840134860318406757758"
      }
    };
    delete options.headers["Content-Type"];
    return fetch(
      `${Config.HOST_SERVER}/events`,
      options
      // {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryIn312MOjBWdkffIM"
      //   },
      //   body: event
      // }
    )
      .then(res => res.json())
      .then(json => {
        return json;
      });
  }
  
  postShare(share, user, event) {
    const options = {
      method: "POST",
      body: share,
      headers: {
        "Content-Type":
        "multipart/form-data; boundary=--------------------------021198133891922950270909"
      }
    };
    delete options.headers["Content-Type"];
    console.log( `${Config.HOST_SERVER}/events/${event}/users/${user._id}/shares`)
    return fetch(
      `${Config.HOST_SERVER}/events/${event}/users/${user._id}/shares`,
      options
    )
      .then(res => res.json())
      .then(json => json);
  }

  postMessage(message, user) {
    console.log("user #postshare", user);
    console.log("message #postshare", message);
    console.log(
      "url #postevent",
      `${Config.HOST_SERVER}/users/${user._id}/messages`
    );
    return fetch(`${Config.HOST_SERVER}/users/${user._id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          return json;
        }
      });
  }
  getMessage() {
    fetch(`${Config.HOST_SERVER}/messages`)
      .then(res => res.json())
      .then(message => message.data);
  }

  getShareid(id) {
    return fetch(`${Config.HOST_SERVER}/shares/${id}`)
      .then(res => res.json())
      .then(share => share.data);
  }

  updateEvent(id, params) {
    console.log("api#params", params);
    const options = {
      method: "PUT",
      // If you add this, upload won't work
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=--------------------------021198133891922950270909"
      }
    };
    delete options.headers["Content-Type"];
    // return fetch(`${Config.HOST_SERVER}/events/${id}?isGo=${params}`, options)
    console.log('urlPut',`${Config.HOST_SERVER}/events/${id}?user=${params}`)
    if(params!=null){
      return fetch(`${Config.HOST_SERVER}/events/${id}?user=${params}`, options)
        .then(res => res.json())
        .then(json => json);
    }
    else{
      return fetch(`${Config.HOST_SERVER}/events/${id}`, options)
      .then(res => res.json())
      .then(json => json);
    }
  }
}
export default new Api();
