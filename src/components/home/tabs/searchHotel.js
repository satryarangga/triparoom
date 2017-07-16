import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchHotelList, clearHotelSearch } from '../../../actions/actionHotel';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';

const DAY_FORMAT = 'YYYY-MM-DD';

class SearchHotel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToHotel: false,
      keyword: '',
      startDate: '',
      endDate: '',
    }
  }

  renderTextField(field) {
    return (
      <div className="form-group">
        <input
          type="text"
          required
          name={field.name}
          className="form-control"
          placeholder={field.placeholder}
          {...field.input}
        />
      </div>
    );
  }

  renderDateField(field) {
    return (
      <div className="form-group">
        <DayPickerInput
          placeholder={field.placeholder}
          className="form-control"
          format={DAY_FORMAT}
          name={field.name}
          {...field.input}
        />
      </div>
    );
  }

  onSubmitSearch(values) {
    this.props.clearHotelSearch();
    this.setState({
                  redirectToHotel: true,
                  keyword: values.keyword,
                  startDate: (values.checkin_date) ? values.checkin_date : moment().format(DAY_FORMAT),
                  endDate: (values.checkout_date) ? values.checkout_date : moment().add(1, 'days').format(DAY_FORMAT)
                });
  }

  render () {
    if(this.state.redirectToHotel) {
      return (
        <Redirect to={`/hotel/${this.state.keyword}/${this.state.startDate}/${this.state.endDate}`}/>
     );
    }

    const { handleSubmit } = this.props;
    return (
      <div>
        <h3>Search and Book Hotels in Bali</h3>
        <form onSubmit={handleSubmit(this.onSubmitSearch.bind(this))}>
          <ul className="list-inline list-unstyled">
            <li>
              <Field
                name="keyword"
                placeholder="Enter Hotel or Location Name"
                component={this.renderTextField}
              />
            </li>
            <li>
              <Field
                name="checkin_date"
                placeholder="Check In Date"
                component={this.renderDateField}
              />
            </li>
            <li>
              <Field
                name="checkout_date"
                placeholder="Check Out Date"
                component={this.renderDateField}
              />
            </li>
            <li>
              <select className="select-one">
                <option>1 Adult</option>
                <option>2 Adult</option>
                <option>3 Adult</option>
                <option>4 Adult</option>
              </select>
            </li>
            <li>
              <button type="submit" className="btn btn-search-travel">Search Now</button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

function validate (values) {
  const errors = {};

  if(!values.name) {
    errors.name = "Hotel name must be filled";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'SearchHotel'
})(
  connect(null, { fetchHotelList, clearHotelSearch }) (SearchHotel)
);
