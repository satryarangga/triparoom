import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import OrderLeft from '../../components/hotel/order/left';
import CheckoutCustomerField from './checkoutCustomerField';
// import PaymentOption from './paymentOption';
import Breadcrumb from '../../utils/breadcrumb';
import NoData from '../../utils/nodata';
import { fetchOrder } from '../../actions/actionOrderHotel';

class OrderHotel extends Component {
  componentDidMount() {
    this.props.fetchOrder();
  }

  renderData() {
    if(this.props.orderHotel.total_price == undefined) {
      return <div className="cp-pinwheel"></div>
    }
    if(this.props.orderHotel.total_price == 0) {
      return (
        <NoData label="No order has been created. Please book a room first" type="hotel" />
      );
    }

    return (
      <div>
        <div className="col-md-12">
          <Breadcrumb label="Booking Confirmation" />
        </div>
        <div className="col-md-3">
          <OrderLeft detail={this.props.orderHotel} />
        </div>
        <div className="col-md-9">
          <CheckoutCustomerField order={this.props.orderHotel} />

          {/* <PaymentOption order={this.props.orderHotel} /> */}
        </div>
      </div>
    );
  }

  render() {
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

function mapStateToProps (state) {
  return {
    orderHotel: state.orderHotel
  }
}

export default connect(mapStateToProps, { fetchOrder }) (OrderHotel);
