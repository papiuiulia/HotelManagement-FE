import React from 'react';
import './App.css';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';
import Booking from './pages/Booking';
import Reservation from './pages/Reservation';

import {Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
  <>
  <Navbar />
  <Switch>
  <Route exact path="/" component={Home} />
  <Route exact path="/rooms/" component={Rooms} />
  <Route exact path="/booking/" component={Booking} />
  <Route exact path="/reservation" component={Reservation} />
  <Route exact path="/rooms/:slug" component={SingleRoom} />
  <Route component={Error} />
  </Switch>
  </>
  );
}

export default App;
