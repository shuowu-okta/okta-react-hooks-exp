import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ImplicitCallback from './ImplicitCallback';
import Navbar from './components/NavBar'
import Home from './components/Home';
import MessagesList from './components/MessagesList';

const App = () => (
  <>
    <Navbar />
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/message-list" component={MessagesList} />
      <Route path="/implicit/callback" component={ImplicitCallback} />
    </Router>
  </>
);

export default App;
