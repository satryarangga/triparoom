import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { sortHotelList, clearHotelSearch, fetchHotelList } from '../../../actions/actionHotel';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';

const DAY_FORMAT = 'YYYY-MM-DD';

class HotelSearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      star: null
    }
  }

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    let params = this.props.params;

    const initData = {
      "keyword": params.keyword,
      "checkin_date": params.start,
      "night": params.night,
      "room": params.room,
      "adult": params.adult
    };

    this.props.initialize(initData);
  }

  renderTextField(field) {
    return (
      <div className="form-group">
        <input
          required
          type="text"
          name={field.name}
          className="form-control flight-input"
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
          required
          placeholder={field.placeholder}
          className="form-control flight-input"
          format={DAY_FORMAT}
          name={field.name}
          {...field.input}
        />
      </div>
    );
  }

  onSubmitSearch(values) {
    this.props.clearHotelSearch();
    let star = (values.star) ? values.star : 0
    let price = getPriceRange(values.price);
    let params = {
      keyword: values.keyword,
      start: values.checkin_date,
      night: values.night,
      room: values.room,
      adult: values.adult,
    }
    this.props.fetchHotelList(params, star, price.min, price.max);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="form-detail-sidebar  animate-reveal">
        <h4>modify search</h4>
          <form onSubmit={handleSubmit(this.onSubmitSearch.bind(this))}>
            <Field
              name="keyword"
              placeholder="Masukkan nama hotel atau lokasi tujuan"
              values={this.props.hotel.queries.q}
              component={this.renderTextField}
            />

            <Field
              name="checkin_date"
              placeholder="Tanggal Check In"
              values={moment(this.props.hotel.queries.startdate).format(DAY_FORMAT)}
              component={this.renderDateField}
            />

            <div className="form-group">
              <Field
                name="night"
                required
                className="form-control"
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
              </Field>
            </div>

            <div className="form-group">
              <Field
                name="room"
                required
                className="form-control"
                component="select"
              >
                <option value="1">1 Kamar</option>
                <option value="2">2 Kamar</option>
                <option value="3">3 Kamar</option>
                <option value="4">4 Kamar</option>
                <option value="5">5 Kamar</option>
                <option value="6">6 Kamar</option>
                <option value="7">7 Kamar</option>
                <option value="8">8 Kamar</option>
              </Field>
            </div>

            <div className="form-group">
              <Field
                name="adult"
                required
                className="form-control"
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
            </div>

            <div className="form-group">
              <Field name="star" className="form-control" component="select">
                <option value="0">All Stars</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </Field>
            </div>

            <div className="form-group">
              <Field name="price" className="form-control" component="select">
                <option value="0">All Price</option>
                <option value="1"> 0 - 500,000</option>
                <option value="2">500,000 - 1,000,000</option>
                <option value="3">1,000,000 - 1,500,000</option>
                <option value="4">1,500,000 - 2,000,000</option>
                <option value="5">> 2,000,000</option>
              </Field>
            </div>
            <button type="submit" className="btn btn-search-travel btn-block">SEARCH</button>
          </form>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { hotel: state.hotel }
}

function getPriceRange (price){
  switch(price) {
    case '1':
      return {min:0, max:500000};
    case '2':
      return {min:500000, max:1000000};
    case '3':
      return {min:1000000, max:1500000};
    case '4':
      return {min:1500000, max:2000000};
    case '5':
      return {min:2000000, max:20000000};
    default:
      return {min:0, max:20000000};
  }
}

export default reduxForm({
  form: 'SearchHotel'
}) (
    connect(mapStateToProps, { sortHotelList, clearHotelSearch, fetchHotelList }) (HotelSearchField)
);
