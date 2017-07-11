import React, { Component } from 'react';

class HotelSortField extends Component {
  render() {
    return (
      <div className="sort-section white-box animate-reveal">
        <h4>Sort results by:</h4>
        <ul className="list-inline list-unstyled">
          <li>
              <a>
                <span className="text">Name</span>
                <span className="up"><i className="fa fa-caret-up"></i></span>
                <span className="down"><i className="fa fa-caret-down"></i></span>
              </a>
          </li>
          <li>
              <a>
                <span className="text">Price</span>
                <span className="up"><i className="fa fa-caret-up"></i></span>
                <span className="down"><i className="fa fa-caret-down"></i></span>
              </a>
          </li>
          <li>
              <a>
                <span className="text">Popular</span>
                <span className="up"><i className="fa fa-caret-up"></i></span>
                <span className="down"><i className="fa fa-caret-down"></i></span>
              </a>
          </li>
          <li>
              <a>
                <span className="text">Rating</span>
                <span className="up"><i className="fa fa-caret-up"></i></span>
                <span className="down"><i className="fa fa-caret-down"></i></span>
              </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default HotelSortField;
