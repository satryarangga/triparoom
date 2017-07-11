import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home/';
import HotelList from './components/hotel/';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/hotel" component={HotelList} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
