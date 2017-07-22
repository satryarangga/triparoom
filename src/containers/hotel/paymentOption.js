import React, { Component } from 'react';
import _ from 'lodash';

class PaymentOption extends Component {
  constructor(props) {
    super(props);
  }

  renderPaymentOptions() {
    let x = 0;
    return _.map(this.props.order.payment_method_options, opt => {
      x++;
      return (
        <label key={x} className="radio-inline padding-bottom-15 padding-right-10">
          <input value={opt.link} type="radio" name="payment_method" />
          {opt.text}
        </label>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="booking_detail white-box animate-reveal">
          <h4>Payment Information</h4>
          <div className="row">
            <div className="col-md-12">
              {this.renderPaymentOptions()}
              {/* <label className="radio-inline padding-bottom-15 padding-right-10">
                <input value="1" type="radio" name="payment_method" />
                Kartu Kredit
              </label>

              <label className="radio-inline padding-bottom-15 padding-right-10">
                <input value="2" type="radio" name="payment_method" />
                Bank Transfer
              </label> */}
            </div>
            <div className="col-md-12">
              <div class="checkbox">
                <label>By continuing, you will be redirected to Tiket.com payment page</label>
              </div>
            </div>
            <div className="col-md-12">
              <p><a className="btn_book">Confirm Booking</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PaymentOption;
