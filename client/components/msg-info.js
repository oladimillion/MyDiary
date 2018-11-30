import React, { Component } from 'react';
import { connect } from "react-redux";


class MsgInfo extends Component {

  timerID = null;

  componentDidMount() {
    this.showStatus = document.getElementById("show-status");
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  hide = () => {
    this.showStatus.classList.add("hide");
    this.clearTimer();
  }

  clearTimer = () => {
    if(this.timerID){
      clearTimeout(this.timerID);
      this.timerID = null;
    }
  }

  show = () => {

    if(!this.showStatus) return;

    this.removeFlags();
    this.clearTimer();

    if(!this.props.Info.success){
      this.showStatus.classList.add("error");
    } else {
      this.showStatus.classList.add("success");
    }

    const {error, errors, message} = this.props.Info;
    this.showStatus.classList.remove("hide");

    this.timerID = setTimeout(()=> {
      this.hide();
    }, 8000);

    if(error){
      return this.appendMsg({error});
    } else if (message){
      return this.appendMsg({message});
    } else if(errors) {
      return this.appendMsg(errors);
    }
  }

  appendMsg = (msg) => {
    return Object.keys(msg).map((label) => {
      return (
        <tr key={label}>
          <td>{label.toUpperCase()}:</td>
          <td>{msg[label]}</td>
        </tr>
      )
    });
  }

  removeFlags = () => {
    this.showStatus.classList.remove("error");
    this.showStatus.classList.remove("success");
  }


  render() {
    return (
      <div id="show-status" class="show-status hide">
        <span 
          onClick={this.hide}
          class="close">
          <i class="fa fa-times"></i>
        </span>
        <table id="status-wrapper">
          <tbody>
            {this.show()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps =(state) => ({
  Info: state.Info,
})

export default connect(mapStateToProps, {})(MsgInfo);
