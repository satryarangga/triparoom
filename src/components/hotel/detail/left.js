import React, { Component } from 'react';
import _ from 'lodash';

const Left = ({ detail }) => {
  return (
    <div>
      <div className="flight_detail_sidebar white-box animate-reveal">
        <div className="reviews">
          <span className="pull-left">RATING </span>
          <span className="pull-right"><label className="reviewRating">{detail.avg_review} / {detail.max_review}</label></span>
        </div>
      </div>
      <div className="help-to-do white-box">
        <h4>Need Our Help?</h4>
        <p>We would be more than happy to help you. Our team advisor are 24/7 at your service to help you.</p>
        <div className="LTT">
          <span className="skin-clr"> <i className="fa fa-phone"></i> +923017030286</span>
        </div>
      </div>
    </div>
  );
}

export default Left;
