import React, { Component } from 'react';

const SearchHotel = () => {
  return (
    <div>
      <h3>Search and Book Hotels</h3>
      <ul className="list-inline list-unstyled">
        <li>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter Your Hotel Name" required />
          </div>
        </li>
        <li>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Check In" id="datepicker3" required />
          </div>
        </li>
        <li>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Check Out" id="datepicker4" required />
          </div>
        </li>
        <li>
          <select className="select-one">
            <option>1 Adult</option>
            <option>2 Adult</option>
            <option>3 Adult</option>
            <option>4 Adult</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default SearchHotel;
