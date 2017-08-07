import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
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
    }
  }

  componentDidMount() {
    this.props.getAirport();
  }

  onSubmitSearch(values) {
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
          placeholder="Return Date"
          component={this.renderDateField}
        />
      );
    }
    return;
  }

  renderDateField(field) {
    return (
      <div className="form-group">
        <DayPickerInput
          required
          placeholder={field.placeholder}
          className="form-control"
          format={DAY_FORMAT}
          name={field.name}
          {...field.input}
        />
      </div>
    );
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
                    placeholder="From"
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
                    placeholder="To"
                    className="select-one"
                    simpleValue
                  />
                }
              />
            </li>
            <li>
              <Field name="type" onChange={event => this.onChangeType(event.target.value)} className="select-one" component="select">
                <option value="1">One Way</option>
                <option value="2">Return Trip</option>
              </Field>
            </li>
            <li>
              <Field
                name="departure_date"
                placeholder="Departure Date"
                component={this.renderDateField}
              />
            </li>
            <li>
              {this.renderReturnDate()}
            </li>
            <li>
              <Field name="adult" className="select-one" component="select">
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults</option>
                <option value="5">5 Adults</option>
                <option value="6">6 Adults</option>
              </Field>
            </li>
            <li>
              <Field name="child" className="select-one" component="select">
                <option value="0">0 Child</option>
                <option value="1">1 Child</option>
                <option value="2">2 Children</option>
                <option value="3">3 Children</option>
                <option value="4">4 Children</option>
                <option value="5">5 Children</option>
                <option value="6">6 Children</option>
              </Field>
            </li>
            <li>
              <Field name="infant" className="select-one" component="select">
                <option value="0">0 Infant</option>
                <option value="1">1 Infant</option>
                <option value="2">2 Infants</option>
                <option value="3">3 Infants</option>
                <option value="4">4 Infants</option>
                <option value="5">5 Infants</option>
                <option value="6">6 Infants</option>
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
