import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { sortHotelList, clearHotelSearch, fetchHotelList } from '../../../actions/actionHotel';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';

const DAY_FORMAT = 'YYYY-MM-DD';

class DetailLeft extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      checkout_date: moment(props.params.startdate).add(props.params.night, 'days').format(DAY_FORMAT),
      night: 0,
      startdate: '',
      room: 0,
      adult: 0
    }

    this.renderDateField = this.renderDateField.bind(this);
  }

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    let params = this.props.params;

    const initData = {
      "checkin_date": params.startdate,
      "checkout_date": moment(params.startdate).add(params.night, 'days').format(DAY_FORMAT),
      "night": params.night,
      "room": params.room,
      "adult": params.adult
    };

    this.props.initialize(initData);
  }

  renderDateField(field) {
    let now = new Date();
    let props = {
      disabledDays: {
        before: now,
        after: new Date( now.getTime() + 24 * 60 * 60 * 1000 * 547)  //547 is maximum date
      },
      onDayClick: (field) => {
        let night = (this.state.night == 0) ? this.props.params.night : this.state.night;
        this.setState({
          startdate: moment(field).format(DAY_FORMAT),
          checkout_date: moment(field).add(night, 'days').format(DAY_FORMAT)
        });
      }
    }

    return (
      <div className="form-group">
        <label>{field.label}</label>
        <DayPickerInput
          required
          placeholder={field.placeholder}
          className="form-control flight-input"
          format={DAY_FORMAT}
          name={field.name}
          dayPickerProps={props}
          {...field.input}
        />
      </div>
    );
  }

  onSubmitSearch(values) {
    let params = this.props.params;

    let night = (values.night) ? values.night : params.night;
    let startdate = (values.checkin_date) ? values.checkin_date : params.startdate;
    let room = (values.room) ? values.room : params.room;
    let adult = (values.adult) ? values.adult : params.adult;

    const url = `/${this.props.params.uri}/${startdate}/${night}/${room}/${adult}`;
    window.location.href = url;
  }

  handleChangeNight(event) {
    let startdate = (this.state.startdate == '') ? this.props.params.startdate : this.state.startdate;
    this.setState({
      night: event.target.value,
      checkout_date: moment(startdate).add(event.target.value, 'days').format(DAY_FORMAT)
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="form-detail-sidebar  animate-reveal">
        <h4>Pencarian Kamar</h4>
          <form onSubmit={handleSubmit(this.onSubmitSearch.bind(this))}>
            <Field
              label="Tanggal Checkin"
              name="checkin_date"
              placeholder="Tanggal Check In"
              component={this.renderDateField}
            />

            <div className="form-group">
              <label>Lama Menginap</label>
              <Field
                name="night"
                required
                className="form-control"
                component="select"
                onChange={this.handleChangeNight.bind(this)}
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
            </div>

            <div className="form-group">
              <label>Tanggal Check Out</label>
              <input
                value={this.state.checkout_date}
                disabled
                type="text"
                className="form-control flight-input"
              />
            </div>

            <div className="form-group">
              <label>Jumlah Kamar</label>
              <Field
                name="room"
                required
                className="form-control"
                component="select"
                onChange={this.setCheckoutDate}
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
              <label>Jumlah Tamu</label>
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
            <button type="submit" className="btn btn-search-travel btn-block">CARI</button>
          </form>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { hotel: state.hotel }
}

export default reduxForm({
  form: 'SearchHotel'
}) (
    connect(mapStateToProps, { sortHotelList, clearHotelSearch, fetchHotelList }) (DetailLeft)
);
