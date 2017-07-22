import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ label }) => {
  return (
    <div className="bread-crumb animate-reveal">
      <h2>{label}</h2>
      <ol className="breadcrumb pull-right">
        <li><Link to="/">Home</Link></li>
        <li className="active">{label}</li>
      </ol>
    </div>
  );
}

export default BreadCrumb;
