import React , { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addFlightOrder } from '../../../actions/actionOrderFlight';
import Loader from '../../../utils/loader.js';
import ErrorMessage from '../../../utils/errorMessage.js';
import { adultPassenger, childPassenger, infantPassenger } from './passengerField';


class FlightOrderField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToOrder: false,
      onLoading: false,
      error: false,
      email: '',
      phone: ''
    }
  }

  renderTextField (field) {
    return (
      <div className="form-group">
        <input
          required
          type={field.type}
          name={field.name}
          className="form-control"
          placeholder={field.placeholder}
          {...field.input}
        />
      </div>
    );
  }

  showError() {
    if(this.state.error) {
      return(
        <ErrorMessage message={this.state.error} />
      );
    }
    return;
  }

  onSubmitCheckout(values) {
    this.setState({
      onLoading: true
    });
    values.salute = (values.salute) ? values.salute : 'Mr';
    let depFlightId = this.props.order.departure.flight_id;
    let retFlightId = this.props.order.return.flight_id;
    let adult = this.props.order.departure.count_adult;
    let child = this.props.order.departure.count_child;
    let infant = this.props.order.departure.count_infant;
    let depFlightName = this.props.order.departure.airlines_name;
    let retFlightName = this.props.order.return.airlines_name;

    this.props.addFlightOrder(values, depFlightId, retFlightId, adult, child, infant, depFlightName, retFlightName, (response) => {
      this.setState({
        onLoading: false
      });
      if(response.status == 200) {
        this.setState({
          redirectToOrder: true,
          email: values.conEmailAddress,
          phone: values.conPhone,
        });
      } else {
        this.setState({
          error: response.error_msgs
        });
      }
    });
  }

  render() {
    if(this.state.onLoading) {
      return(
        <Loader text="Mohon tunggu. Pemesanan sedang dilakukan." />
      );
    }

    if(this.state.redirectToOrder) {
      return (
        <Redirect to={`/flight-confirmation/${encodeURIComponent(this.state.email).replace(/\./g, "-")}/${this.state.phone}`}/>
     );
    }

    const { handleSubmit } = this.props;

    return(
      <div>
        {this.showError()}
        <form onSubmit={handleSubmit(this.onSubmitCheckout.bind(this))}>
          <div className="booking_detail white-box animate-reveal">
            <h4>Contact Information</h4>
            <div className="row">
              <div className="col-md-6">
                <Field
                  name="conEmailAddress"
                  type="text"
                  placeholder="Masukkan Email Kontak"
                  component={this.renderTextField}
                />
              </div>
              <div className="col-md-6">
                <Field
                  name="conPhone"
                  type="text"
                  placeholder="Enter Nomor Telepon"
                  component={this.renderTextField}
                />
              </div>
            </div>
          </div>
          <div className="booking_detail white-box animate-reveal">
            <h4>Passenger Information</h4>
            <div className="row">

              {adultPassenger(this.props.order.required, this.props.order.departure.count_adult)}

              {childPassenger(this.props.order.required, this.props.order.departure.count_child)}

              {infantPassenger(this.props.order.required, this.props.order.departure.count_infant)}

              <div className="col-md-12">
                <p><button className="btn_book" type="submit">Konfirmasi Penumpang</button></p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addFlightOrder }, dispatch);
}

export default reduxForm({
  form: 'Checkout'
}) (
    connect(null, mapDispatchToProps) (FlightOrderField)
);
