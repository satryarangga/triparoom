import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHotelList } from '../../actions/actionHotel';
import { Link } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';
import SearchField from './searchField';
import SortField from './sortField';
import ListDataHotel from '../../containers/hotel/list';

class ListHotel extends Component {
  render () {
    return (
      <div>
        <Header />
        <div className="inner-body">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="bread-crumb animate-reveal">
                  <h2>Hotels List</h2>
                  <ol className="breadcrumb pull-right">
                    <li><Link to="/">Home</Link></li>
                    <li className="active">Hotel List</li>
                  </ol>
                </div>
                <div className="col-md-3">
                  <div className="search-tem white-box animate-reveal">
                    <span><i className="fa fa-search"></i> <label className="searchResultText">1,984 results found.</label></span>
                  </div>
                  <SearchField />
                </div>
                <div className="col-md-9 col-xs-12">
                  <SortField />
                  <ListDataHotel />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ListHotel;
