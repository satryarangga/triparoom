import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { clearDepartureFlight } from '../../../actions/actionFlight';
import numeral from 'numeral';

class Departures extends Component {
  editDepartureFlight() {
    this.props.clearDepartureFlight();
  }

  render() {
    if(_.size(this.props.flight.goDetail) == 0) {
      return <div></div>
    }

    const flight = this.props.flight.goDetail;
    console.log(flight);
    return (
      <div>
        <div className="flight_detail_sidebar white-box animate-reveal">
          <h4>Departure Flight</h4>
          <div className="flight-logo">
            <img alt="logo" src={flight.image} />
          </div>
          <div className="details-text">
            <h4>{flight.airlines_name} <a className="btn btn-stop">{flight.stop}</a> <br />
              <small>{flight.departure_city_name} - {flight.arrival_city_name}</small><br />
              <a onClick={this.editDepartureFlight.bind(this)} className="btn btn-select">Edit</a>
            </h4>
          </div>
          <hr />
          <div className="LTT">
            <span className="skin-clr">
              <i className="fa fa-clock-o"></i>
              Total Time  <span className="pull-right">{flight.duration}</span>
            </span>
          </div>
          <div className="LTT">
            <span className="skin-clr"> <i className="fa fa-plane"></i>Take Off
              <span className="pull-right">{flight.departure_flight_date_str} {flight.simple_departure_time}</span>
            </span><br />
          </div>
          <div className="LTT">
            <span className="skin-clr"> <i className="fa fa-plane fa-rotate-90"></i>Landing
              <span className="pull-right">{flight.arrival_flight_date_str} {flight.simple_arrival_time}</span>
            </span><br />
          </div>
          <div className="details-text">
            <h4> Other Detail</h4>
          </div>
          <div className="LTT">
            <span className="skin-clr"><b>Adult:</b>
            <span className="pull-right"><b>{this.props.flight.queries.adult}</b></span> </span><br />
          </div>
          <div className="LTT">
            <span className="skin-clr"><b>Child:</b>
            <span className="pull-right"><b>{this.props.flight.queries.child}</b></span> </span><br />
          </div>
          <div className="LTT">
            <span className="skin-clr"><b>Infant:</b>
            <span className="pull-right"><b>{this.props.flight.queries.infant}</b></span> </span><br />
          </div>
          <div className="LTT">
            <span className="skin-clr"><b>Total Price:</b>
            <span className="pull-right"><b>IDR {numeral(flight.price_value).format('IDR 0,0')}</b></span> </span><br />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    flight: state.flight
  }
}

export default connect(mapStateToProps, { clearDepartureFlight }) (Departures);
