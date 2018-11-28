import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LogoutAction } from "../actions/auth";

import Logo from "../../UI/assets/img/andela.png";


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
    this.settingsDropdown = 
      document.getElementById("settings-dropdown");
    this.modalReminder = document.getElementById("modal-reminder");
    this.modalProfile = document.getElementById("modal-profile");
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
      this.settingsDropdown.classList.add("_hide");
    }, 200);
  }

  showSettingItem = () => {
    this.clearTimeout()
    this.settingsDropdown.classList.remove("_hide");
  }

  toggleModalReminder = () => {
    this.modalReminder.classList.toggle("hide");
  }

  toggleModalProfile = () => {
    this.modalProfile.classList.toggle("hide");
  }

  logout = () => {
    this.props.LogoutAction();
  }


  render() {
    return (
      <header class="main-header">
        <div class="row">
          <div class="logo">
            <img 
              src={Logo} 
              alt="logo"
            />
          </div>
          <div class="app-name">
            MyDiary
          </div>

          <div class='dropdown'>
            <button 
              onClick={this.showSettingItem}
              class="settings-btn" 
              id="settings-btn">
              Settings
              <i id="settings-icon" class="fa fa-caret-down"></i>
            </button>
            <ul class="dropdown-items _hide" id="settings-dropdown">
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
          </div>
        </div>
      </header>
    )
  }
}


export default connect(null, {
  LogoutAction,
})(Header);
