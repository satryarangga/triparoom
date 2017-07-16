import React, { Component } from 'react';
import _ from 'lodash';

const Review = ({ detail }) => {

  const renderFacilities = _.map(detail.facilities, fac => {
    return (
      <li><i className="fa fa-check-square-o"></i> {fac.facility_name}</li>
    );
  });

  return (
    <div>
      <div className="feature-inflight">
        <h4>Hotel Facilities</h4>
        <ul className="list-unstyled list-inline">
          {renderFacilities}
        </ul>
      </div>
    </div>
  );
}

export default Review;
