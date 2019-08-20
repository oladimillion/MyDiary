
import React, { Component } from "react";
import{ connect } from "react-redux";
import EntryNav from "./partials/entry-nav";

import { 
  CreateEntryRequest, 
  GetEntryRequest,
  UpdateEntryRequest,
} from "../actions/entry";
import { GetReminderRequest } from "../actions/reminder";


class CreateEntry extends Component {

  initialState = {
    entry: [],
    entryTitle: "",
    entryContent: "",
    loading: false,
    editMode: false,
    entryId: null,
  }
  
  state = this.initialState;

  componentDidMount() {
    this.props.GetReminderRequest();

    const { entryId } = this.props.match.params;

    if(entryId && !this.state.entry.length){
      this.setState({ entryId, editMode: true });
      this.props.GetEntryRequest();
    }
  }

  static getDerivedStateFromProps(props, state) {

    const editEntry = props.entry.find(data => {
      return data.entry_id === state.entryId;
    });

    if(!editEntry || !state.editMode) return null;

    return { 
      entry: props.entry, 
      editMode: false,
      entryTitle: editEntry.entry_title,
      entryContent: editEntry.entry_content,
    };
  }

  change = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  submit = (e) => {
    e.preventDefault();

    if(this.state.loading) return;

    this.setState({loading: true});
    const { entryTitle, entryContent, entryId } = this.state;

    if(!entryId){
      this.props.CreateEntryRequest({entryTitle, entryContent})
        .then(res => {
          this.setState(this.initialState);
          this.props.history.push("/");
        })
        .catch(err => {
          this.setState({loading: false});
        });
    } else {
      this.props.UpdateEntryRequest({entryTitle, entryContent}, entryId)
        .then(res => {
          this.setState(this.initialState);
          this.props.history.push("/");
        })
        .catch(err => {
          this.setState({loading: false});
        });
    }
  }

  render() {
    return (
      <main class="main-body row flow-column">

        <EntryNav />

        <div class="wrapper entry-wrapper row">

          <div class="entry">
            <form id="form" onSubmit={this.submit}>
              <div class="entry-input row">
                <input 
                  class="input" 
                  name="entryTitle"
                  id="entryTitle"
                  type="text" 
                  value={this.state.entryTitle}
                  onChange={this.change}
                  placeholder="Entry Title" 
                />
                <button
                  id="btn-save"
                  type="submit"
                  class="btn btn-save">
                  { this.state.loading ? 
                      <i class="fa fa-spinner fa-spin"></i> 
                      : (
                        <span>
                          <i class="fa fa-floppy-o"></i>
                          &nbsp;&nbsp;Save
                        </span>
                      )
                  }
                </button>
              </div>
              <div class="entry-input textarea">
                <textarea 
                  placeholder="Your entry here"
                  class="input"
                  id="entryContent"
                  value={this.state.entryContent}
                  onChange={this.change}
                  name="entryContent"></textarea>
              </div>
            </form>
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
  CreateEntryRequest,
  GetEntryRequest,
  UpdateEntryRequest,
  GetReminderRequest,
})(CreateEntry);
