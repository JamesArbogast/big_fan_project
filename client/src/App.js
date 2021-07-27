import "./App.css";

import React, { useEffect, useState } from "react";
import { Link, Redirect, Router } from "@reach/router";

import NotFound from "./views/NotFound";
import Users from "./views/Users";
import User from "./views/User";
import NewUser from "./views/NewUser";
import EditUser from "./views/EditUser";
import UserFeed from "./views/UserFeed";

function App() {

  return (
    <div>
      <nav className="nav">
        <h1 className="navbar-brand mb-0" style={{marginLeft: "90px"}}>GateKeep</h1>
        <div style={{marginLeft: "90px"}}>
          <Link
            to={"/user/feed"}
            style={{margin: "10px", textDecoration: "none", fontSize: "20px", color: "darkblue"}}
          >
            Home
          </Link>
          <Link
            to="/pets/new"
            style={{margin: "10px", textDecoration: "none", fontSize: "20px", color: "darkblue"}}
          >
            Add bands to your Keeper list!
          </Link>
        </div>
      </nav>
      <Router>
        <Users path="/users" />
        <User path="/users/:id" />
        <UserFeed path="/user/feed/:id" />
        <EditUser path="/users/:id/edit" />
        <NewUser path="/users/new" />
        <Redirect from="/" to="/users" noThrow="true" />
        <NotFound default path="/notFound"/>
      </Router>
    </div>
  );
}

export default App;
