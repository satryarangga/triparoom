import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import _ from 'lodash';
import { getAirport } from '../../../actions/actionFlight';

const DAY_FORMAT = 'YYYY-MM-DD';

class SearchFlight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tripType: 1,
      redirectToFlight: false,
      dcode: '',
      acode: '',
      ddate: '',
      rdate: '',
      adult: 1,
      child: 0,
      infant: 0,
      errors: []
    }
  }

  componentDidMount() {
    this.props.getAirport();
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

    if(values.return_date && this.convertTimeStamp(values.departure_date) > this.convertTimeStamp(values.return_date)) {
      errors.push('Tanggal pulang minimal harus sama atau lebih besar dari tanggal pergi. Silahkan pilih tanggal lain.');
    }

    return errors;
  }

  onSubmitSearch(values) {
    let errors = this.validate(values);

    this.setState({
      errors
    });

    if(_.size(errors) == 0) {
      this.setState({
        redirectToFlight: true,
        dcode: values.from,
        acode: values.to,
        ddate: values.departure_date,
        rdate: (values.return_date) ? values.return_date : 0,
        adult: (values.adult) ? values.adult : 1,
        child: (values.child) ? values.child : 0,
        infant: (values.infant) ? values.infant : 0,
      });
    }
  }

  onChangeType (value) {
    this.setState({
      tripType: value
    });
  }

  renderReturnDate() {
    if(this.state.tripType == 2) {
      return (
        <Field
          name="return_date"
          placeholder="Tanggal Pulang"
          component={this.renderDateField}
        />
      );
    }
    return;
  }

  renderDateField(field) {
    let now = new Date();
    let props = {
      disabledDays: {
        before: now,
        after: new Date( now.getTime() + 24 * 60 * 60 * 1000 * 547)  //547 is maximum date
      }
    }
    return (
      <div className="form-group">
        <DayPickerInput
          required
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

  render() {
    if(this.state.redirectToFlight) {
      return (
        <Redirect to={`/flight/${this.state.dcode}/${this.state.acode}/${this.state.ddate}/${this.state.rdate}/${this.state.adult}/${this.state.child}/${this.state.infant}`}/>
     );
    }

    const { handleSubmit } = this.props;
    return (
      <div>
        {this.showError()}
        <h3>Search Flight</h3>
        <form onSubmit={handleSubmit(this.onSubmitSearch.bind(this))}>
          <ul className="list-inline list-unstyled">
            <li>
              <Field name="from"
                component={props =>
                  <Select
                    value={props.input.value}
                    onChange={props.input.onChange}
                    onBlur={() => props.input.onBlur(props.input.value)}
                    options={this.props.flight.airport}
                    placeholder="Keberangkatan"
                    className="select-one"
                    simpleValue
                  />
                }
              />
            </li>
            <li>
              <Field name="to"
                component={props =>
                  <Select
                    value={props.input.value}
                    onChange={props.input.onChange}
                    onBlur={() => props.input.onBlur(props.input.value)}
                    options={this.props.flight.airport}
                    placeholder="Tujuan"
                    className="select-one"
                    simpleValue
                  />
                }
              />
            </li>
            <li>
              <Field name="type" onChange={event => this.onChangeType(event.target.value)} className="select-one" component="select">
                <option value="1">Single Trip</option>
                <option value="2">Return Trip</option>
              </Field>
            </li>
            <li>
              <Field
                name="departure_date"
                placeholder="Tanggal Berangkat"
                component={this.renderDateField}
              />
            </li>
            <li>
              {this.renderReturnDate()}
            </li>
            <li>
              <Field name="adult" className="select-one" component="select">
                <option value="1">1 Dewasa</option>
                <option value="2">2 Dewasa</option>
                <option value="3">3 Dewasa</option>
                <option value="4">4 Dewasa</option>
                <option value="5">5 Dewasa</option>
                <option value="6">6 Dewasa</option>
              </Field>
            </li>
            <li>
              <Field name="child" className="select-one" component="select">
                <option value="0">0 Anak</option>
                <option value="1">1 Anak</option>
                <option value="2">2 Anak</option>
                <option value="3">3 Anak</option>
                <option value="4">4 Anak</option>
                <option value="5">5 Anak</option>
                <option value="6">6 Anak</option>
              </Field>
            </li>
            <li>
              <Field name="infant" className="select-one" component="select">
                <option value="0">0 Bayi</option>
                <option value="1">1 Bayi</option>
                <option value="2">2 Bayi</option>
                <option value="3">3 Bayi</option>
                <option value="4">4 Bayi</option>
                <option value="5">5 Bayi</option>
                <option value="6">6 Bayi</option>
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

function mapStateToProps(state) {
  return {
    flight: state.flight
  }
}

export default reduxForm({
  form: 'searchFlight'
})(
  connect(mapStateToProps, { getAirport }) (SearchFlight)
);
