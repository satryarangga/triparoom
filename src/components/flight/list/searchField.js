import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { fetchFlight, clearFlightSearch } from '../../../actions/actionFlight';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import Select from 'react-select';
import _ from 'lodash';

const DAY_FORMAT = 'YYYY-MM-DD';

class FlightSearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tripType: (this.props.params.rdate == 0) ? 1 : 2,
      error: []
    }

    this.renderDateField = this.renderDateField.bind(this);
  }

  componentDidMount() {
    this.handleInitialize();
  }

  onChangeType (value) {
    this.setState({
      tripType: value
    });
  }

  convertTimeStamp(time) {
    var myDate= time;
    myDate=myDate.split("-");
    var newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[1];

    return new Date(newDate).getTime();
  }

  validate(values) {
    let errors = [];
    values.adult = (values.adult) ? values.adult : 1;
    if(!values.from) {
      errors.push('Kota Keberangkatan Harus Diisi');
    }

    if(!values.to) {
      errors.push('Kota Tujuan Harus Diisi');
    }

    if(values.to == values.from) {
      errors.push('Kota Tujuan dan Keberangakatan Harus Berbeda');
    }

    if(values.infant > values.adult) {
      errors.push('Jumlah Dewasa Harus Lebih Banyak Dari Jumlah Bayi');
    }

    if(values.return_date && this.convertTimeStamp(values.depart_date) > this.convertTimeStamp(values.return_date)) {
      errors.push('Tanggal pulang minimal harus sama atau lebih besar dari tanggal pergi. Silahkan pilih tanggal lain.');
    }

    return errors;
  }

  handleInitialize() {
    const initData = {
      "from": this.props.params.dcode,
      "to": this.props.params.acode,
      "depart_date": this.props.params.ddate,
      "type": (this.props.params.rdate == 0) ? 1 : 2,
      "return_date": (this.props.params.rdate == 0) ? null : this.props.params.rdate,
      "adult": this.props.params.adult,
      "child": this.props.params.child,
      "infant": this.props.params.infant,
    };

    this.props.initialize(initData);
  }

  renderReturnDate() {
    if(this.state.tripType == 2) {
      return (
        <Field
          label="Tanggal Pulang"
          name="return_date"
          placeholder="Return Date"
          component={this.renderDateField}
        />
      );
    }
    return;
  }

  renderTextField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          required
          type="text"
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
        before: now,
        after: new Date( now.getTime() + 24 * 60 * 60 * 1000 * 547)  //547 is maximum date
      },
    }
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <DayPickerInput
          required
          value={field.value}
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

  showError() {
    let errors = this.state.errors;
    let x = 0;
    return _.map(errors, e => {
      x++;
      return (
        <div key={x} className="alert alert-danger">
          <p>{e}</p>
        </div>
      )
    });
  }

  onSubmitSearch(values) {
    let errors = this.validate(values);

    this.setState({
      errors
    });

    if(_.size(errors) == 0) {
      this.props.clearFlightSearch();
      this.props.fetchFlight
      (
        (values.from) ? values.from : 'CGK',
        (values.to) ? values.to : 'DPS',
        values.depart_date,
        (values.return_date && this.state.tripType == 2) ? values.return_date : 0,
        (values.adult) ? values.adult : 1,
        (values.child) ? values.child : 0,
        (values.infant) ? values.infant : 0,
      );
    }
  }

  render() {
    if(_.size(this.props.flight.goDetail) > 0) {
      return <div></div>
    }

    const { handleSubmit, load } = this.props;

    return (
      <div className="form-detail-sidebar  animate-reveal">
        {this.showError()}
        <h4>Filter Pencarian</h4>
          <form onSubmit={handleSubmit(this.onSubmitSearch.bind(this))}>
              <label>Keberangkatan</label>
              <Field name="from"
                component={props =>
                  <Select
                    value={(props.input.value) ? props.input.value : this.props.params.dcode}
                    onChange={value => props.input.onChange(value)}
                    onBlur={() => props.input.onBlur(props.input.value)}
                    options={this.props.flight.airport}
                    placeholder="From"
                    className="select-one-autocomplete"
                    simpleValue
                  />
                }
              />

              <label>Tujuan</label>
              <Field name="to"
                component={props =>
                  <Select
                    value={(props.input.value) ? props.input.value : this.props.params.acode}
                    onChange={value => props.input.onChange(value)}
                    onBlur={() => props.input.onBlur(props.input.value)}
                    options={this.props.flight.airport}
                    placeholder="Destination"
                    className="select-one-autocomplete"
                    simpleValue
                  />
                }
              />

              <div className="form-group">
                <label>Jenis Perjalanan</label>
                <Field
                  name="type"
                  onChange={event => this.onChangeType(event.target.value)}
                  className="form-control"
                  component="select"
                >
                  <option value="1">One Way</option>
                  <option value="2">Return Trip</option>
                </Field>
              </div>

              <Field
                label="Tanggal Berangkat"
                name="depart_date"
                placeholder="Departure Date"
                component={this.renderDateField}
              />

            {this.renderReturnDate()}

            <div className="form-group">
              <label>Jumlah Dewasa</label>
              <Field name="adult" className="form-control" component="select">
                <option value="1">1 Dewasa</option>
                <option value="2">2 Dewasa</option>
                <option value="3">3 Dewasa</option>
                <option value="4">4 Dewasa</option>
                <option value="5">5 Dewasa</option>
              </Field>
            </div>

            <div className="form-group">
              <label>Jumlah Anak</label>
              <Field name="child" className="form-control" component="select">
                <option value="0">0 Anak</option>
                <option value="1">1 Anak</option>
                <option value="2">2 Anak</option>
                <option value="3">3 Anak</option>
                <option value="4">4 Anak</option>
                <option value="5">5 Anak</option>
              </Field>
            </div>

            <div className="form-group">
              <label>Jumlah Bayi</label>
              <Field name="infant" className="form-control" component="select">
                <option value="0">0 Bayi</option>
                <option value="1">1 Bayi</option>
                <option value="2">2 Bayi</option>
                <option value="3">3 Bayi</option>
                <option value="4">4 Bayi</option>
                <option value="5">5 Bayi</option>
              </Field>
            </div>
            <button type="submit" className="btn btn-search-travel btn-block">CARI</button>
          </form>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    flight: state.flight
  }
}

export default reduxForm({
  form: 'SearchHotel',
}) (
    connect(mapStateToProps, { fetchFlight, clearFlightSearch }) (FlightSearchField)
);
