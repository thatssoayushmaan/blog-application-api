import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Settings from "./pages/Settings/Settings";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import Register from './pages/Register/Register'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useContext } from "react";
import { Context } from "./Context/Context";


export default function App() {
  const {user} = useContext(Context)
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/posts">
          <Home />
        </Route>
        <Route path="/register">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/write">{user ? <Write /> : <Login />}</Route>
        <Route path="/settings">
          {user ? <Settings /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

