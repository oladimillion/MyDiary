
import React from "react";
import { NavLink } from "react-router-dom";


const EntryNav = (props) => {
  return (
    <header class="dashboard-header">
      <ul class="nav-entry row">
        <li class="nav-list selected">
          <NavLink to="/entry/create">
            <i class="fa fa-plus"></i>
            &nbsp;New Entry
          </NavLink>
        </li>
        <li class="nav-list">
          <NavLink exact to="/">
            <i class="fa fa-list"></i>
            &nbsp;View All Entries
          </NavLink>
        </li>
      </ul>
    </header>

  )
}

export default EntryNav;

