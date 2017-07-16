import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ label, star }) => {
  return (
    <div className="bread-crumb animate-reveal">
      <h2>{label} {showRatingStar(star)}</h2>
      <ol className="breadcrumb pull-right">
        <li><Link to="/">Home</Link></li>
        <li className="active">{label}</li>
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

export default BreadCrumb;
