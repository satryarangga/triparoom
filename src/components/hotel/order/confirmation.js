import React, { Component } from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../../../utils/breadcrumb';
import { fetchOrder } from '../../../actions/actionOrderHotel';
import Header from '../../layout/header';
import Footer from '../../layout/footer';

class HotelOrderConfirmation extends Component {
  componentDidMount() {
    this.props.fetchOrder();
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Header />
        <div className="inner-body confirmation">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <BreadCrumb label="Booking Confirmation" />
              </div>
              <div className="col-md-12">
                <div className="alert alert-success alert-dismissable fade in">
                  <strong><i className="fa fa-check"></i></strong>
                  Your booking is being processed. We sent you the instruction to complete the payment to your email &nbsp;
                  <strong>{this.props.orderHotel.login_email}</strong>
                </div>
                <p>
                  Please follow the instruction in your email sent by <strong>tiket.com</strong> to complete the booking. Triparoom is partner of tiket.com.
                </p>
              </div>
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
    orderHotel: state.orderHotel
  }
}

export default connect(mapStateToProps, { fetchOrder }) (HotelOrderConfirmation);
