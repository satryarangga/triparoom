import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import Breadcrumb from '../../utils/breadcrumb';
import OrderLeft from '../../components/flight/confirmation/left';
import Payment from '../../components/flight/confirmation/payment';
import { fetchFlightOrder } from '../../actions/actionOrderFlight';
import NoData from '../../utils/nodata';

class FlightConfirmation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchFlightOrder();
  }

  renderData() {
    if(this.props.orderFlight.order.total == undefined) {
      return <div className="cp-pinwheel"></div>
    }

    if(this.props.orderFlight.order.order_id == null) {
      return (
        <NoData label="No order has been created. Please book a flight first" type="flight" />
      );
    }

    return(
      <div>
        <div className="col-md-12">
          <Breadcrumb label="Flight Confirmation" />
        </div>
        <div className="col-md-3">
          <OrderLeft order={this.props.orderFlight.order} />
        </div>
        <div className="col-md-9">
          <div>
            <Payment order={this.props.orderFlight.order} contact={this.props.match.params} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return(
      <div>
        <Header />
        <div className="inner-body">
          <div className="container">
            <div className="row">
              {this.renderData()}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orderFlight: state.orderFlight
  }
}

export default connect(mapStateToProps, { fetchFlightOrder }) (FlightConfirmation);
