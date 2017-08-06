import React, { Component } from 'react';
import _ from 'lodash';
import numeral from 'numeral';

class FlightOrderLeft extends Component {
  constructor(props) {
    super(props);
  }

  renderReturn() {
    if(_.size(this.props.order.return) > 0) {
      return (
        <div>
          {this.renderData('return', this.props.order.return)}
      </div>
      )
    }
    return;
  }

  renderData(type, data) {
    return(
      <div>
        <div className="flight_detail_sidebar white-box animate-reveal">
          <h4>{_.capitalize(type)} Flight</h4>
          <div className="flight-logo">
            <img alt="logo" src={data.image} />
          </div>
          <div className="details-text">
            <h4 className="pull-left">
              {data.airlines_name} <a className="btn btn-stop">{data.stop}</a> <br />
              <small>{data.full_via}</small>
            </h4>
            <span className="pull-right"><b>{data.flight_number}</b></span>
          </div>
          <hr />
          <div className="LTT">
            <span className="skin-clr">
              <i className="fa fa-clock-o"></i>Total Time
              <span className="pull-right">{data.duration}</span>
            </span>
            <br />
          </div>
          <div className="LTT">
            <span className="skin-clr"><i className="fa fa-user"></i>Seats
            <span className="pull-right">{data.count_adult} Adult, {data.count_child} Child, {data.count_infant} Infant</span> </span><br />
          </div>
          <div className="LTT">
            <span className="skin-clr"><i className="fa fa-suitcase"></i>Baggage
            <span className="pull-right">{data.check_in_baggage} {data.check_in_baggage_unit}</span> </span><br />
          </div>
          <div className="LTT">
            <span className="skin-clr"><i className="fa fa-money"></i><b>Total Price:</b>
            <span className="pull-right"><b>IDR {numeral(data.price_value).format('IDR 0,0')}</b></span> </span><br />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderData('departure', this.props.order.departure)}

        {this.renderReturn()}
      </div>
    );
  }
}

export default FlightOrderLeft;
