import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import { fetchFlight, setDepartureFlight, fetchFlightData, setOrderFlight } from '../../actions/actionFlight';
import numeral from 'numeral';

class ListDataFlight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      depFlightId: null,
      retFlightId: null,
      depDate: null,
      retDate: null,
      redirectOrder: false
    }

    this.addFlightToOrder = this.addFlightToOrder.bind(this);
  }

  selectDepartureFlight(flight) {
    let roundTrip = this.props.flight.queries.ret_date;

    if(roundTrip) {
      this.props.setDepartureFlight(flight);
    } else {
      this.addFlightToOrder(flight);
    }
  }

  addFlightToOrder(flight) { // ADD TO ORDER
    let roundTrip = (_.size(this.props.flight.retResult) == 0) ? false : true;

    if(roundTrip) {
      this.setState({
        depFlightId: this.props.flight.goDetail.flight_id,
        retFlightId: flight.flight_id,
        depDate: this.props.flight.queries.date,
        retDate: this.props.flight.queries.ret_date,
        redirectOrder: true
      });
    } else {
      this.setState({
        depFlightId: flight.flight_id,
        retFlightId: 0,
        depDate: this.props.flight.queries.date,
        retDate: 0,
        redirectOrder: true
      });
    }
  }

  componentDidMount() {
    let param = this.props.params;
    this.props.fetchFlight(param.dcode, param.acode, param.ddate, param.rdate, param.adult, param.child, param.infant);
  }

  renderListFlight(type) {
    let fetchType = (type == 'departure') ? this.props.flight.depResult : this.props.flight.retResult;

    if(_.size(fetchType) == 0 && _.size(this.props.flight.queries) > 0) {
      return <div>No Flight Found</div>
    }

    if(_.size(fetchType) == 0) {
      return <div className="cp-pinwheel"></div>
    }

    return _.map(fetchType, flight => {
      return (
        <div key={flight.flight_id} className="flight_box_detail white-box">
          <div className="row">
            <div className="col-md-2">
              <div className="flight-logo">
                <img  alt="logo" src={flight.image} />
              </div>
            </div>
            <div className="col-md-8">
              <div className="details-text">
                <h4>{flight.airlines_name}
                  <a href="#" className="btn btn-stop">{flight.stop}</a>
                  <br /><small>{flight.departure_city_name} - {flight.arrival_city_name}</small>
                </h4>
              </div>
              <div className="details-feature">
                <label>Bagasi: {flight.check_in_baggage} {flight.check_in_baggage_unit}</label>
                <label>Makanan : {(flight.has_food == 1) ? 'Ya' : 'Tidak'}</label>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-4">
                  <div className="LTT">
                    <span className="skin-clr"> <i className="fa fa-plane"></i> Take off</span><br />
                    <span className="time">{flight.departure_flight_date_str} {flight.simple_departure_time}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="LTT">
                    <span className="skin-clr"> <i className="fa fa-plane fa-rotate-90"></i> Landing</span><br />
                    <span className="time">{flight.arrival_flight_date_str} {flight.simple_arrival_time}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="LTT no-border">
                    <span className="skin-clr"> <i className="fa fa-clock-o"></i> Time</span><br />
                    <span className="time">{flight.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="select-sec">
                <span>TOTAL PRICE <br />
                  <span className="pri">
                    IDR {numeral(flight.price_value).format('IDR 0,0')}
                  </span>
                </span>
                <a
                  onClick={ (type == 'departure') ? this.selectDepartureFlight.bind(this, flight) : this.addFlightToOrder.bind(this, flight) }
                  target="_blank"
                  className="btn btn_select"
                  >
                  SELECT
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    if(this.state.redirectOrder) {
      return(
        <Redirect to={`/flight-booking/${this.state.depFlightId}/${this.state.retFlightId}/${this.state.depDate}/${this.state.retDate}`}/>
      );
    }

    if(_.size(this.props.flight.goDetail) == 0) {
      return (
        <div>
          <h4>Departure Flight</h4>
          {this.renderListFlight('departure')}
        </div>
      )
    }
    return (
      <div>
        <h4>Return Flight</h4>
        {this.renderListFlight('return')}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    flight: state.flight
  }
}

export default connect(mapStateToProps, { fetchFlight, setDepartureFlight, setOrderFlight }) (ListDataFlight);
