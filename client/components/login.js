import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LoginRequest } from "../actions/auth";


class Login extends Component {

  initialState = {
    username: "",
    password: "",
    loading: false,
  };

  state = this.initialState;

  change = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  submit = (e) => {
    e.preventDefault();

    if(this.state.loading) return;

    this.setState({loading: true});
    const { loading, ...rest } = this.state;
    this.props.LoginRequest(rest)
      .then(res => {
        this.setState(this.initialState);
        this.props.history.push("/");
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
              <div class="form-title">Login</div>
              <div class="input-wrapper">
                <label class="input-label" for="lusername">
                  Username <span class="required">*</span>
                </label>
                <input 
                  class="input" 
                  type="text"
                  name="username"
                  id="lusername"
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
                <label class="input-label" for="lpassword">
                  Password <span class="required">*</span>
                </label>
                <input 
                  class="input" 
                  type="password"
                  name="password"
                  id="lpassword"
                  value={this.state.password}
                  onChange={this.change}
                  required
                  placeholder="Enter password"
                />
                <span class="input-icon">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <div class="form-btn">
                <button 
                  id="btn-signin"
                  class="btn btn-signup" type="submit">
                  { this.state.loading ? 
                      <i class="fa fa-spinner fa-spin"></i> 
                      : "Sign In"
                  }
                </button>
              </div>
              <div class="alt-link">
                <Link to="/signup">No account yet?</Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default connect(null, {
  LoginRequest,
})(Login);
