import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortHotelList } from '../../../actions/actionHotel';
import _ from 'lodash';

class HotelSortField extends Component {
  clickSort (field, type) {
    this.props.sortHotelList(field, type, this.props.list);
  }

  render() {
    return (
      <div className="sort-section white-box animate-reveal">
        <h4>Urutkan Data:</h4>
        <ul className="list-inline list-unstyled">
          <li>
              <a onClick={this.clickSort.bind(this, 'name', 'asc')}>
                <span className="text">Nama</span>
                <span className="up"><i className="fa fa-caret-up"></i></span>
                <span className="down"><i className="fa fa-caret-down"></i></span>
              </a>
          </li>
          <li>
              <a onClick={this.clickSort.bind(this, 'total_price', 'asc')}>
                <span className="text">Termurah</span>
                <span className="up"><i className="fa fa-caret-up"></i></span>
                <span className="down"><i className="fa fa-caret-down"></i></span>
              </a>
          </li>
          <li>
              <a onClick={this.clickSort.bind(this, 'id', 'asc')}>
                <span className="text">Terpopuler</span>
                <span className="up"><i className="fa fa-caret-up"></i></span>
                <span className="down"><i className="fa fa-caret-down"></i></span>
              </a>
          </li>
          <li>
              <a onClick={this.clickSort.bind(this, 'rating', 'desc')}>
                <span className="text">Rating Terbaik</span>
                <span className="up"><i className="fa fa-caret-up"></i></span>
                <span className="down"><i className="fa fa-caret-down"></i></span>
              </a>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { hotel: state.hotel }
}

export default connect(mapStateToProps, { sortHotelList })(HotelSortField);
