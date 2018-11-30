import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RegRequest } from "../actions/auth";
import { Action } from "../actions/index";
import { MSGINFO_FAILURE } from "../actions/types";

class Signup extends Component {

  initialState = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
    loading: false,
  }

  state = this.initialState;

  change = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  isValidData(data) {
    if(data.password !== data.cpassword) {
      this.props.Action(
        MSGINFO_FAILURE, 
        {errors: {password: "Passwords must match"}}
      );
      return false;
    }
    return true;
  }

  submit = (e) => {
    e.preventDefault();

    if(!this.isValidData(this.state) || this.state.loading) return;

    this.setState({loading: true});
    const { loading, ...rest } = this.state;
    this.props.RegRequest(rest)
      .then(res => {
        this.setState(this.initialState);
        this.props.history.push("/login");
      })
      .catch(err => {
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <main class="main-body row">

        <div class="wrapper row">

          <div class="info-wrapper">
            <div class="info">
              MyDiary is an online journal where you can
              pen down your thoughts and feelings
            </div>
          </div>

          <div class="form-wrapper login">
            <form id="form" onSubmit={this.submit}>
              <div class="form-title">Register</div>
              <div class="input-wrapper">
                <label class="input-label" for="rusername">
                  Username <span class="required">*</span>
                </label>
                <input 
                  class="input" 
                  type="text"
                  name="username"
                  id="rusername"
                  value={this.state.username}
                  onChange={this.change}
                  required
                  placeholder="Enter username"
                />
                <span class="input-icon">
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <div class="input-wrapper">
                <label class="input-label" for="remail">
                  Email <span class="required">*</span>
                </label>
                <input 
                  class="input" 
                  type="email"
                  name="email"
                  id="remail"
                  value={this.state.email}
                  onChange={this.change}
                  required
                  placeholder="Enter email"
                />
                <span class="input-icon">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
              <div class="input-wrapper">
                <label class="input-label" for="rpassword">
                  Password <span class="required">*</span>
                </label>
                <input 
                  class="input" 
                  type="password"
                  name="password"
                  id="rpassword"
                  value={this.state.password}
                  onChange={this.change}
                  required
                  placeholder="Enter password"
                />
                <span class="input-icon">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <div class="input-wrapper">
                <label class="input-label" for="cpassword">
                  Confirm Password <span class="required">*</span>
                </label>
                <input 
                  class="input" 
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  value={this.state.cpassword}
                  onChange={this.change}
                  required
                  placeholder="Re-enter password"
                />
                <span class="input-icon">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <div class="form-btn">
                <button 
                  id="btn-signup"
                  class="btn btn-signup" 
                  type="submit">
                  { this.state.loading ? <i class="fa fa-spinner fa-spin"></i> : "Sign Up"}
                </button>
              </div>
              <div class="alt-link">
                <Link to="/login">Have an account?</Link>
              </div>
            </form>
          </div>
        </div>
      </main>

    )
  }
}

export default connect(null, {
  RegRequest,
  Action,
})(Signup);

