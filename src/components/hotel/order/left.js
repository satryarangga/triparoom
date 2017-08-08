import React, { Component } from 'react';
import _ from 'lodash';
import Help from '../../../utils/help';
import numeral from 'numeral';

const Left = ({ detail }) => {
  return (
    <div>
      <div className="flight_detail_sidebar white-box animate-reveal">
        <div className="details-text">
          <h4>{detail.hotel_name}</h4>
          <div>{detail.room_name}</div>
        </div>
        <hr />
        <div className="LTT">
          <span className="skin-clr">Check In  <span className="pull-right">{detail.checkin_date}</span> </span><br />
        </div>
        <div className="LTT">
          <span className="skin-clr">Check Out  <span className="pull-right">{detail.checkout_date}</span> </span><br />
        </div>
        <div className="LTT">
          <span className="skin-clr">Lama Menginap  <span className="pull-right">{detail.nights} Malam</span> </span><br />
        </div>
        <div className="price">
          <span className="pull-left">Total Biaya </span>
          <span className="pull-right">IDR {numeral(detail.total_price).format('IDR 0,0')}</span>
        </div>
      </div>
      <Help />
    </div>
  );
}

export default Left;
