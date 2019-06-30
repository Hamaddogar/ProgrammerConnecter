import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/not-found/NotFound";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:handle' component={Profile} />
          <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
          </Switch>
          <Switch>
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path='/add-experience'
              component={AddExperience}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path='/add-education'
              component={AddEducation}
            />
          </Switch>
          <Switch>
            <PrivateRoute exact path='/feed' component={Posts} />
          </Switch>
          <Switch>
            <PrivateRoute exact path='/post/:id' component={Post} />
          </Switch>
          <Route exact path='/not-found' component={NotFound} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
