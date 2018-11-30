import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


const ProtectedRoute = (ComposedComponent) => {

  class ProtectedRouteComponent extends Component {

    isAuth = () => {
      return !!localStorage.token;
    }

    render() {
      return (
        this.isAuth()
        ? 
          <ComposedComponent {...this.props} />
        : <Redirect to="/login" />
      )
    }
  }

  const mapStateToProps = (state) => ({
    user: state.User,
  });

  return connect(mapStateToProps, {})(ProtectedRouteComponent);
};

export default ProtectedRoute;
