import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHotelList } from '../../../actions/actionHotel';
import { Link } from 'react-router-dom';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import SearchField from './searchField';
import SortField from './sortField';
import ListDataHotel from '../../../containers/hotel/list';

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
                  <h2>Hotel di {this.props.hotel.queries.q}</h2>
                  <ol className="breadcrumb pull-right">
                    <li><Link to="/">Home</Link></li>
                    <li className="active">Daftar Hotel</li>
                  </ol>
                </div>
                <div className="col-md-3">
                  <div className="search-tem white-box animate-reveal">
                    <span>
                      <label className="searchResultText">
                        <i className="fa fa-search"></i> {this.props.hotel.pagination.total_found} hotel ditemukan
                      </label>
                    </span>
                  </div>
                  <SearchField
                    params={this.props.match.params}
                    queries={this.props.hotel.queries}
                  />
                </div>
                <div className="col-md-9 col-xs-12">
                  <SortField
                    list={this.props.hotel}
                  />
                  <ListDataHotel
                    params={this.props.match.params}
                  />
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

function mapStateToProps (state) {
  return { hotel: state.hotel }
}

export default connect(mapStateToProps, { fetchHotelList })(ListHotel);
