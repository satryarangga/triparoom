import React, { Component } from 'react';

const Rating = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <div className="full-white-box review_box">
            <h3>4/5.0</h3>
            <span className="rating">
              <a href="#"><i className="fa fa-star"></i></a>
              <a href="#"><i className="fa fa-star"></i></a>
              <a href="#"><i className="fa fa-star"></i></a>
              <a href="#"><i className="fa fa-star"></i></a>
              <a href="#"><i className="fa fa-star-o"></i></a>
            </span>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="detail_flight_number">
                <div className="pull-left">
                  <ul className="list-unstyled">
                    <li>HSERVICE:</li>
                    <li>QUALITY:</li>
                    <li>CLEAN:</li>
                    <li>COMFORT:</li>
                  </ul>
                </div>
                <div className="pull-right">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#"><i className="fa fa-star"></i></a>
                      <a href="#"><i className="fa fa-star"></i></a>
                      <a href="#"><i className="fa fa-star"></i></a>
                      <a href="#"><i className="fa fa-star-o"></i></a>
                      <a href="#"><i className="fa fa-star-o"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fa fa-star"></i></a>
                      <a href="#"><i className="fa fa-star"></i></a>
                      <a href="#"><i className="fa fa-star"></i></a>
                      <a href="#"><i className="fa fa-star-o"></i></a>
                      <a href="#"><i className="fa fa-star-o"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fa fa-star"></i></a>
                      <a href="#"><i className="fa fa-star"></i></a>
                      <a href="#"><i className="fa fa-star"></i></a>
                      <a href="#"><i className="fa fa-star-o"></i></a>
                      <a href="#"><i className="fa fa-star-o"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fa fa-star"></i></a>
                      <a href="#"><i className="fa fa-star"></i></a>
                      <a href="#"><i className="fa fa-star"></i></a>
                      <a href="#"><i className="fa fa-star-o"></i></a>
                      <a href="#"><i className="fa fa-star-o"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
