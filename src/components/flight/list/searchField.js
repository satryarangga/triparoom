import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { fetchFlight, clearFlightSearch } from '../../../actions/actionFlight';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import Select from 'react-select';

const DAY_FORMAT = 'YYYY-MM-DD';

class FlightSearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tripType: 1,
    }
  }

  componentDidMount() {
    this.handleInitialize();
  }

  onChangeType (value) {
    this.setState({
      tripType: value
    });
  }

  handleInitialize() {
    const initData = {
      "depart_date": this.props.params.ddate,
      "type": (this.props.params.rdate == 0) ? 1 : 2,
      "return_date": this.props.params.rdate,
      "adult": this.props.params.adult,
      "child": this.props.params.child,
      "infant": this.props.params.infant,
    };

    this.props.initialize(initData);
  }

  renderReturnDate() {
    if(this.state.tripType == 2 || this.props.params.rdate != 0) {
      return (
        <Field
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
    return (
      <div className="form-group">
        <DayPickerInput
          required
          value={field.value}
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
    this.props.clearFlightSearch();
    this.props.fetchFlight(
                          (values.from) ? values.from : 'CGK',
                          (values.to) ? values.to : 'DPS',
                          values.depart_date,
                          (values.return_date && this.state.tripType == 2) ? values.return_date : 0,
                          (values.adult) ? values.adult : 1,
                          (values.child) ? values.child : 0,
                          (values.infant) ? values.infant : 0,
                        );
  }

  render() {
    if(_.size(this.props.flight.goDetail) > 0) {
      return <div></div>
    }

    const { handleSubmit, load } = this.props;

    return (
      <div className="form-detail-sidebar  animate-reveal">
        <h4>modify search</h4>
          <form onSubmit={handleSubmit(this.onSubmitSearch.bind(this))}>
              <Field name="from"
                component={props =>
                  <Select
                    value={this.props.params.dcode}
                    onChange={props.input.onChange}
                    onBlur={() => props.input.onBlur(props.input.value)}
                    options={this.props.flight.airport}
                    placeholder="From"
                    className="select-one-autocomplete"
                    simpleValue
                  />
                }
              />

              <Field name="to"
                component={props =>
                  <Select
                    value={this.props.params.acode}
                    onChange={props.input.onChange}
                    onBlur={() => props.input.onBlur(props.input.value)}
                    options={this.props.flight.airport}
                    placeholder="Destination"
                    className="select-one-autocomplete"
                    simpleValue
                  />
                }
              />

              <div className="form-group">
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
                name="depart_date"
                placeholder="Departure Date"
                component={this.renderDateField}
              />

            {this.renderReturnDate()}

            <div className="form-group">
              <Field name="adult" className="form-control" component="select">
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults</option>
                <option value="5">5 Adults</option>
              </Field>
            </div>

            <div className="form-group">
              <Field name="child" className="form-control" component="select">
                <option value="0">0 Child</option>
                <option value="1">1 Child</option>
                <option value="2">2 Children</option>
                <option value="3">3 Children</option>
                <option value="4">4 Children</option>
                <option value="5">5 Children</option>
              </Field>
            </div>

            <div className="form-group">
              <Field name="infant" className="form-control" component="select">
                <option value="0">0 Infant</option>
                <option value="1">1 Infant</option>
                <option value="2">2 Infants</option>
                <option value="3">3 Infants</option>
                <option value="4">4 Infants</option>
                <option value="5">5 Infants</option>
              </Field>
            </div>
            <button type="submit" className="btn btn-search-travel btn-block">SEARCH</button>
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
