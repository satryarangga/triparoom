import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home/';
import HotelList from './components/hotel/list/';
import HotelDetail from './containers/hotel/detail';
import HotelOrder from './containers/hotel/order';
import HotelOrderConfirmation from './components/hotel/order/confirmation';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/order" component={HotelOrder} />
        <Route path="/process-payment" component={HotelOrderConfirmation} />
        <Route path="/hotel/:keyword/:start/:end" component={HotelList} />
        <Route path="/:regional/:hotelname/:id" component={HotelDetail} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
