import React, { Component } from 'react';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import { Link } from 'react-router-dom';
import SearchField from './searchField';
import SortField from './sortField';
import Departures from './departure';
import ListDataFlight from '../../../containers/flight/list';

class FlightList extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="inner-body">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="bread-crumb animate-reveal">
                  <h2>Daftar Penerbangan</h2>
                  <ol className="breadcrumb pull-right">
                    <li><Link to="/">Home</Link></li>
                    <li className="active">Daftar Penerbangan</li>
                  </ol>
                </div>
                <div className="col-md-3">
                  <Departures />
                  <SearchField params={this.props.match.params} />
                </div>
                <div className="col-md-9 col-xs-12">
                  <SortField />
                  <ListDataFlight
                    params={this.props.match.params}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default FlightList;
