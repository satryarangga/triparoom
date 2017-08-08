import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const NoData = ({ label, type }) => {
  return (
    <div>
      <div className="no-data">
        <p>{label}</p>
        <Link to="/" className="btn btn-primary">Cari {_.capitalize(type)}</Link>
      </div>
    </div>
  )
}

export default NoData;
