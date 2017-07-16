import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home/';
import HotelList from './components/hotel/list/';
import HotelDetail from './containers/hotel/detail';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/hotel/:keyword/:start/:end" component={HotelList} />
        <Route path="/:regional/:hotelname/:id" component={HotelDetail} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
