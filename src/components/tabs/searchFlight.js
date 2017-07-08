import React, { Component } from 'react';

const SearchFlight = () => {
  return (
    <div>
      <h3>Search Flight</h3>
      <ul className="list-inline list-unstyled">
        <li>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="From" required />
          </div>
        </li>
        <li>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="To" required />
          </div>
        </li>
        <li>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Departure Date" id="datepicker3" required />
          </div>
        </li>
        <li>
          <select className="select-one">
            <option>1 Passenger</option>
            <option>2 Passengers</option>
            <option>3 Passengers</option>
            <option>4 Passengers</option>
            <option>5 Passengers</option>
            <option>6 Passengers</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default SearchFlight;
