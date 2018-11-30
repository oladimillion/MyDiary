import React, { Component } from 'react';
import{ connect } from "react-redux";
import { ProfileRequest } from "../actions/auth";

class Profile extends Component {

  state = {
    username: "",
    email: "",
    newPassword: "",
    oldPassword: "",
    loading: false,
  }

  modalProfile = null;

  componentDidMount() {
    this.modalProfile = document.getElementById("modal-profile");
  }

  static getDerivedStateFromProps(props, state) {
    const { username, email } = props.user;
    if(!state.username && !state.email){
      return { username, email };
    }
    return null;
  }

  toggleModalProfile = () => {
    this.modalProfile.classList.toggle("hide");
  }

  change = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  submit = (e) => {
    e.preventDefault();

    if(this.state.loading) return;

    this.setState({loading: true});

    const { loading, ...rest } = this.state;

    this.props.ProfileRequest(this.filterData(rest))
      .then(res => {
        this.setState({loading: false});
        this.toggleModalProfile();
      })
      .catch(err => {
        this.setState({loading: false});
      }); 
  }

  filterData = (rest) => {
    const body = Object.assign({}, rest);

    if(!body.newPassword) {
      delete body.newPassword;
    }

    if(!body.oldPassword) {
      delete body.oldPassword;
    }

    return body;
  }

  render() {

    return (
      <div id="modal-profile" class="modal hide">
        <div class="modal-content">
          <header class="modal-header">
            <i class="fa fa-user-circle"></i>
            &nbsp;&nbsp;PROFILE
            <span
              onClick={this.toggleModalProfile}
              class="close-btn cancel-profile-btn">
              <i class="fa fa-times"></i>
            </span>
          </header>
          <div class="modal-body">
            <form id="profile-form" onSubmit={this.submit}>
              <div class="well">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span class="label">Username:</span>
                      </td>
                      <td>
                        <input 
                          class="input" 
                          id="pusername"
                          type="text" 
                          name="username"
                          value={this.state.username}
                          onChange={this.change}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="label">Email:</span>
                      </td>
                      <td>
                        <input 
                          class="input" 
                          id="pemail"
                          type="email" 
                          name="email"
                          value={this.state.email}
                          onChange={this.change}
                          placeholder="change email"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="label">Old Password:</span>
                      </td>
                      <td>
                        <input 
                          class="input" 
                          id="oldPassword"
                          type="password" 
                          name="oldPassword"
                          value={this.state.oldPassword}
                          onChange={this.change}
                          placeholder="old password"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="label">New Password:</span>
                      </td>
                      <td>
                        <input 
                          class="input" 
                          id="newPassword"
                          type="password" 
                          name="newPassword"
                          value={this.state.newPassword}
                          onChange={this.change}
                          placeholder="new password"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="ctrl-btns">
                <button 
                  onClick={this.toggleModalProfile}
                  type="button"
                  class="btn btn-cancel cancel-profile-btn">
                  Cancel
                </button>
                <button 
                  id="profile-btn"
                  type="submit" class="btn btn-save modal-save">
                  { this.state.loading ? 
                      <i class="fa fa-spinner fa-spin"></i> 
                      : "Save"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.User,
});

export default connect(mapStateToProps, {
  ProfileRequest,
})(Profile);
