import React from 'react';
import Api from '../utils/Api';

const withUser = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      const user = Api.getUser();
      // console.log(user)
      user.isAuthenticated = () => 
        user.hasOwnProperty('_id') && user._id !== null;
      return <WrappedComponent user={user} {...this.props} />
    }
  }
};

export default withUser;