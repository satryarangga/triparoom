import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Head = ({ detail }) => {
  return (
    <div className="bread-crumb animate-reveal">
      <div className="pull-left">
        <h3>{detail.name} {showRatingStar(detail.star)}</h3>
        <p><i className="fa fa-map-marker"></i> {detail.address}. {detail.city}, {detail.country}</p>
      </div>
      <ol className="breadcrumb pull-right">
        <li><Link to="/">Home</Link></li>
        <li className="active">Detail Hotel</li>
      </ol>
    </div>
  );
}
const showRatingStar = (star) => {
  return _.map(_.times(star), (a) => {
    return (
      <i key={a} className="fa fa-star gold"></i>
    );
  });
}

export default Head;
