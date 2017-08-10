import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import Breadcrumb from '../../utils/breadcrumb';
import OrderLeft from '../../components/flight/order/left';
import FlightOrderField from '../../components/flight/order/field';
import { fetchFlightData, fetchFlightOrder } from '../../actions/actionOrderFlight';
import _ from 'lodash';

class FlightOrder extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let param = this.props.match.params;
    this.props.fetchFlightData(param.depFlightId, param.retFlightId, param.depDate, param.retDate);
    this.props.fetchFlightOrder();
  }

  formatCurrentOrderDetail() {
    let details = [];

    _.map(this.props.orderFlight.order.order_detail, (detail) => {
      details.push(detail.order_detail_id);
    });

    return details.join(",");
  }

  renderData() {
    if(_.size(this.props.orderFlight.departure) == 0) {
      return <div className="cp-pinwheel"></div>
    }

    return (
      <div>
        <div className="col-md-12">
          <Breadcrumb label="Rincian Penerbangan" />
        </div>
        <div className="col-md-3">
          <OrderLeft order={this.props.orderFlight} />
        </div>
        <div className="col-md-9">
          <FlightOrderField
            order={this.props.orderFlight}
            currentdetail={this.formatCurrentOrderDetail()}
          />
        </div>
      </div>
    )
  }

  render() {
    {this.formatCurrentOrderDetail()}
    return (
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
    )
  }
}

function mapStateToProps(state) {
  return {
    orderFlight: state.orderFlight
  }
}

export default connect(mapStateToProps, { fetchFlightData, fetchFlightOrder }) (FlightOrder);
