import React, { Component } from "react";
import{ connect } from "react-redux";
import { Link } from "react-router-dom";

import EntryNav from "./partials/entry-nav";

import { GetEntryRequest } from "../actions/entry";
import { GetReminderRequest } from "../actions/reminder";

class ViewEntry extends Component {

  initialState = {
    entry: [],
    selectedEntry: {},
    loading: false,
  }

  state = this.initialState;

  listSelected = false;

  entryBody = null;
  entryAside = null;

  componentDidMount() {
    this.entryBody = document.getElementById("entry-body");
    this.entryAside = document.getElementById("entry-aside");

    if(!this.state.entry.length) {
      this.setState({ loading: true });
      Promise.all([
        this.props.GetReminderRequest(),
        this.props.GetEntryRequest()
      ])
        .then(res => {
          this.setState({ loading: false });
        })
        .catch(err => {
          this.setState({ loading: false });
        });
    }
  }

  static getDerivedStateFromProps(props, state) {
    return { entry: props.entry };
  }

  clearSelections = () => {
    this.asideList = document.querySelectorAll("li.list");
    this.asideList.forEach(element => {
      element.classList.remove("selected");
    });
  }

  showContentBody = () => {
    this.entryBody.classList.remove("hide");
  }

  itemSelected = (id, data) => {
    this.clearSelections();
    document.getElementById(id).classList.add("selected");
    this.setState({selectedEntry: data});
    this.showContentBody();
    this.hideMobileAside();
    this.listSelected = true;
  }

  truncateDate = (date) => {
    return new Date(date).toLocaleDateString();
  }

  entryList = () => {
    return this.state.entry.map((data) => {
      const id = `list${data.entry_id}`;
      return (
        <li
          id={id}
          key={data.entry_id} 
          class="list"
          onClick={ () => this.itemSelected(id, data)}>
          <span class="list-icon">
            <i class="fa fa-book"></i>
          </span>
          <div class="title">
            {data.entry_title}
          </div>
          <div class="date">
            {this.truncateDate(data.updated_at)}
          </div>
        </li>
      )
    })
  }

  hideMobileAside = () => {
    this.entryAside.classList.add("mobile-aside");
  }

  toggleMobileAside = () => {
    if(!this.listSelected){
      return;
    }
    this.entryAside.classList.toggle("mobile-aside");
  }

  formatDate = (date) => {
    return new Date(date).toLocaleString()
  }

  entryDetail = () => {
    const data = this.state.selectedEntry;
    return (
      <span>
        <div class="title">
          {data.entry_title}
        </div>
        <div class="content" id="body-content">
          {data.entry_content}
        </div>
        <div class="row btm-content">
          <button 
            id="btn-edit"
            class="btn btn-edit">
            <Link to={"/entry/create/"+data.entry_id}>
              <i class="fa fa-edit"></i>
              &nbsp;Edit
            </Link>
          </button>
          <div class="date">
            {this.formatDate(data.updated_at)}
          </div>
        </div>
      </span>
    );
  }

  render() {

    return (
      <main class="main-body row flow-column">

        <EntryNav />

        <div class="wrapper entry-wrapper entry-list-wrapper row">

          <div class="switch-arrow">
            <button 
              onClick={this.toggleMobileAside}
              type="button"
              class="btn btn-back" id="btn-back">
              <i class="fa fa-bars"></i>
            </button>
          </div>

          <div class="row list-entry">

            <aside class="aside-bar" id="entry-aside">
              <ul class="list-wrapper" id="list-wrapper">
                {this.entryList()}
              </ul>
              {
                (!this.state.loading &&
                  !this.state.entry.length) && 
                  <div id="info" class="show-action">
                    <div class="_center">No entry yet</div>
                  </div>
              }
              {
                this.state.loading && 
                <div id="loading" class="show-action">
                  <div class="_center">
                    <i class="fa fa-spinner fa-spin"></i>
                  </div>
                </div>
              }
            </aside>

            <div 
              class="entry entry-body mobile-body hide"
              id="entry-body">
              {this.entryDetail()}
            </div>

          </div>

        </div>

      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  entry: state.Entry,
});

export default connect(mapStateToProps, {
  GetEntryRequest,
  GetReminderRequest,
})(ViewEntry);

