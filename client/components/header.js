import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LogoutAction } from "../actions/auth";


class Header extends Component {

  timerID = null;
  state = {
    showSetting: false,
  };

  componentDidMount() {
    document.getElementsByTagName("body")[0]
      .addEventListener("click", (e) => {
        if(e.target.id !== "settings-btn" 
          && e.target.id !== "settings-icon"){
          this.hideSettingItem();
        }
      });
  }

  clearTimeout = () => {
    if(this.timerID){
      clearTimeout(this.timerID);
      this.timerID = null;
    }
  }

  hideSettingItem = () => {
    this.clearTimeout();
    this.timerID = setTimeout(() => {
      this.setState({ showSetting: false });
    }, 200);
  }

  showSettingItem = () => {
    this.clearTimeout()
    this.setState({ showSetting: true });
  }

  toggleModalReminder = () => {
    document.getElementById("modal-reminder").classList.toggle("hide");
  }

  toggleModalProfile = () => {
    document.getElementById("modal-profile").classList.toggle("hide");
  }

  logout = () => {
    this.props.LogoutAction();
  }

  isAuth = () => {
    return !!Object.keys(this.props.user).length;
  }

  render() {
    return (
      <header class="main-header">
        <div class="row">

          <div class="app-name">
            MyDiary
          </div>

          <div class='dropdown'>

            {
              this.isAuth() && 
              <span>
                <button 
                  onClick={this.showSettingItem}
                  class="settings-btn" 
                  id="settings-btn">
                  Settings
                  <i id="settings-icon" class="fa fa-caret-down"></i>
                </button>
                <ul class={this.state.showSetting ? "dropdown-items": "dropdown-items _hide"}
                  id="settings-dropdown">
                  <li>
                    <a 
                      class="cancel-profile-btn"
                      onClick={this.toggleModalProfile}>
                      <i class="fa fa-user"></i>
                      &nbsp;Profile
                    </a>
                  </li>
                  <li>
                    <a 
                      class="cancel-btn" 
                      onClick={this.toggleModalReminder}>
                      <i class="fa fa-bell"></i>
                      &nbsp;Reminder
                    </a>
                  </li>
                  <li>
                    <Link 
                      to="/login" 
                      id="logout" 
                      onClick={this.logout}>
                      <i class="fa fa-sign-out"></i>
                      &nbsp;Logout
                    </Link>
                  </li>
                </ul>
              </span>
            }
          </div>
        </div>
      </header>
    )
  }
}


const mapStateToProps = (state) => ({
  user: state.User,
});

export default connect(mapStateToProps, {
  LogoutAction,
})(Header);
