import React, { Component } from 'react';

class HotelSearchField extends Component {
  render() {
    return (
      <div className="form-detail-sidebar  animate-reveal">
        <h4>modify search</h4>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Destination" />
        </div>

        <div className="form-group">
          <input type="text" className="form-control" placeholder="Check In" />
        </div>

        <div className="form-group">
          <input type="text" className="form-control" placeholder="Check Out" />
        </div>

        <div className="form-group">
          <select className="form-control">
            <option>1 Star</option>
            <option>2 Stars</option>
            <option>3 Stars</option>
            <option>4 Stars</option>
            <option>5 Stars</option>
          </select>
        </div>

        <div className="form-group">
          <select className="form-control">
            <option> 0 - 500,000</option>
            <option>500,000 - 1,000,000</option>
            <option>1,000,000 - 1,500,000</option>
            <option>1,500,000 - 2,000,000</option>
            <option>> 2,000,000</option>
          </select>
        </div>
        <a className="btn btn-search-travel btn-block">SEARCH</a>
      </div>
    );
  }
}

export default HotelSearchField;
