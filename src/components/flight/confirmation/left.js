import React, { Component } from 'react';
import _ from 'lodash';
import numeral from 'numeral';

class FlightOrderLeft extends Component {
  constructor(props) {
    super(props);
  }

  renderData(type, data) {
    return _.map(this.props.order.order_detail, detail => {
      return(
        <div key={detail.order_detail_id}>
          <div className="flight_detail_sidebar white-box animate-reveal">
            <div className="flight-logo">
              <img alt="logo" src={detail.order_photo} />
            </div>
            <div className="details-text">
              <h4 className="pull-left">
                {detail.order_name_detail} <br />
                <small>{detail.detail.departure_airport_name} - {detail.detail.arrival_airport_name} </small>
              </h4>
            </div>
            <hr />
            <div className="LTT">
              <span className="skin-clr">
                <i className="fa fa-calendar"></i><b>Flight Date</b>
                <span className="pull-right"><b>{detail.detail.flight_date}</b></span>
              </span>
              <br />
            </div>
            <div className="LTT">
              <span className="skin-clr"><i className="fa fa-clock-o"></i><b>Flight Time</b>
              <span className="pull-right"><b>{detail.detail.departure_time} - {detail.detail.arrival_time}</b></span> </span><br />
            </div>
            <div className="LTT">
              <span className="skin-clr"><i className="fa fa-money"></i><b>Ticket Price</b>
              <span className="pull-right"><b>IDR {numeral(detail.customer_price).format('IDR 0,0')}</b></span> </span><br />
            </div>
            <div className="LTT">
              <span className="skin-clr"><i className="fa fa-money"></i><b>Tax and Charge:</b>
              <span className="pull-right"><b>IDR {numeral(detail.tax_and_charge).format('IDR 0,0')}</b></span> </span><br />
            </div>
            <div className="LTT">
              <span className="skin-clr"><i className="fa fa-money"></i><b>Baggage Fee:</b>
              <span className="pull-right"><b>IDR {numeral(detail.baggage_fee).format('IDR 0,0')}</b></span> </span><br />
            </div>
            <div className="LTT">
              <span className="skin-clr"><i className="fa fa-money"></i><b>Subtotal:</b>
              <span className="pull-right"><b>IDR {numeral(detail.subtotal_and_charge).format('IDR 0,0')}</b></span> </span><br />
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderData('departure', this.props.order.departure)}

        <div className="flight_detail_sidebar white-box animate-reveal">
          <div className="LTT big-font">
            <span className="skin-clr"><b>Total Bill</b>
            <span className="pull-right"><b>IDR {numeral(this.props.order.total).format('IDR 0,0')}</b></span> </span><br />
          </div>
        </div>

      </div>
    );
  }
}

export default FlightOrderLeft;
