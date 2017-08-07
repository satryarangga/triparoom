import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home/';
import HotelList from './components/hotel/list/';
import HotelDetail from './containers/hotel/detail';
import HotelOrder from './containers/hotel/order';
import FlightOrder from './containers/flight/order';
import FlightConfirmation from './containers/flight/confirmation';
import HotelOrderConfirmation from './components/hotel/order/confirmation';
import FlightList from './components/flight/list/';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/order" component={HotelOrder} />
        <Route path="/flight-confirmation/:email/:phone" component={FlightConfirmation} />
        <Route path="/flight-booking/:depFlightId/:retFlightId/:depDate/:retDate" component={FlightOrder} />
        <Route path="/flight/:dcode/:acode/:ddate/:rdate/:adult/:child/:infant" component={FlightList} />
        <Route path="/process-payment" component={HotelOrderConfirmation} />
        <Route path="/hotel/:keyword/:start/:night/:room/:adult" component={HotelList} />
        <Route path="/:uri/:startdate/:night/:room/:adult/" component={HotelDetail} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
