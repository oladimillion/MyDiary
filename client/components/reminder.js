import React, { Component } from "react";
import { connect } from "react-redux";

import { 
  CreateReminderRequest, 
} from "../actions/reminder";



class Reminder extends Component {

  state = {
    count: "0",
    time: "",
    loading: false,
    zoneOffset: new Date().getTimezoneOffset().toString(),
  }

  componentDidMount() {
    this.modalReminder = document.getElementById("modal-reminder");
  }

  static getDerivedStateFromProps(props, state) {
    const { time } = props.reminder;
    if(!state.time){
      return { time };
    }
    return { count: String(props.entry.length) };
  }

  toggleModalReminder = () => {
    this.modalReminder.classList.toggle("hide");
  }

  change = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  submit = (e) => {
    e.preventDefault();

    if(this.state.loading) return;

    const { loading, count, ...rest } = this.state;

    this.setState({ loading: true });
    this.props.CreateReminderRequest(rest)
      .then(res => {
        this.setState({ loading: false });
        this.toggleModalReminder();
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div id="modal-reminder" class="modal hide">
        <div class="modal-content">
          <header class="modal-header">
            <i class="fa fa-bell"></i>
            &nbsp;&nbsp;REMINDER
            <span 
              onClick={this.toggleModalReminder}
              class="close-btn cancel-btn">
              <i class="fa fa-times"></i>
            </span>
          </header>
          <div class="modal-body">
            <form id="reminder-form" onSubmit={this.submit}>
              <div class="well">
                <table>
                  <tbody>
                    <tr>
                      <td class="reminder">
                        <span class="label">Number of entries:</span>
                      </td>
                      <td>
                        <input 
                          class="input" 
                          id="count"
                          type="text" 
                          name="count"
                          placeholder="change count"
                          value={this.state.count}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="reminder">
                        <span class="label">Set Time:</span>
                      </td>
                      <td>
                        <input 
                          class="input time" 
                          id="time"
                          type="time" 
                          name="time"
                          value={this.state.time}
                          onChange={this.change}
                          placeholder="change time"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="ctrl-btns">
                <button 
                  onClick={this.toggleModalReminder}
                  type="button"
                  class="btn btn-cancel cancel-btn">
                  Cancel
                </button>
                <button 
                  id="reminder-btn"
                  type="submit"
                  class="btn btn-save modal-save">
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
  reminder: state.Reminder,
  entry: state.Entry,
});

export default connect(mapStateToProps, {
  CreateReminderRequest, 
})(Reminder);

