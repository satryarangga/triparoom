import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortFlight } from '../../../actions/actionFlight';
import _ from 'lodash';

class FlightSortField extends Component {
  clickSort (field) {
    this.props.sortFlight(field);
  }

  render() {
    return (
      <div className="sort-section white-box animate-reveal">
        <h4>Urutkan Data:</h4>
        <ul className="list-inline list-unstyled">
          <li>
              <a onClick={this.clickSort.bind(this, 'price_value')}>
                <span className="text">Termurah</span>
                <span className="up"><i className="fa fa-caret-up"></i></span>
                <span className="down"><i className="fa fa-caret-down"></i></span>
              </a>
          </li>
          <li>
              <a onClick={this.clickSort.bind(this, 'duration_minutes')}>
                <span className="text">Durasi Terpendek</span>
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
  return { flight: state.flight }
}

export default connect(mapStateToProps, { sortFlight })(FlightSortField);
