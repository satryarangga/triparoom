import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
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
      night: '',
      adult: '',
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
    let now = new Date();
    let props = {
      disabledDays: {
        before: "now",
        after: new Date( now.getTime() + 24 * 60 * 60 * 1000 * 547)  //547 is maximum date
      }
    }
    return (
      <div className="form-group">
        <DayPickerInput
          placeholder={field.placeholder}
          className="form-control"
          format={DAY_FORMAT}
          name={field.name}
          dayPickerProps={props}
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
                  night: (values.night) ? values.night : 1,
                  adult: (values.adult) ? values.adult : 1,
                });
  }

  render () {
    if(this.state.redirectToHotel) {
      return (
        <Redirect to={`/hotel/${this.state.keyword}/${this.state.startDate}/${this.state.night}/1/${this.state.adult}`}/>
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
                name="night"
                required
                className="select-one"
                component="select"
              >
                <option value="1">1 Malam</option>
                <option value="2">2 Malam</option>
                <option value="3">3 Malam</option>
                <option value="4">4 Malam</option>
                <option value="5">5 Malam</option>
                <option value="6">6 Malam</option>
                <option value="7">7 Malam</option>
                <option value="8">8 Malam</option>
                <option value="9">9 Malam</option>
                <option value="10">10 Malam</option>
                <option value="11">11 Malam</option>
                <option value="12">12 Malam</option>
                <option value="13">13 Malam</option>
                <option value="14">14 Malam</option>
                <option value="15">15 Malam</option>
              </Field>
            </li>
            <li>
              <Field
                name="adult"
                required
                className="select-one"
                component="select"
              >
                <option value="1">1 Dewasa</option>
                <option value="2">2 Dewasa</option>
                <option value="3">3 Dewasa</option>
                <option value="4">4 Dewasa</option>
                <option value="5">5 Dewasa</option>
                <option value="6">6 Dewasa</option>
                <option value="7">7 Dewasa</option>
                <option value="8">8 Dewasa</option>
              </Field>
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
