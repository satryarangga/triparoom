import React, { Component } from 'react';
import { ADDITIONAL_FIELD } from '../../../../config/flightField';
import _ from 'lodash';
import { Field, formValueSelector } from 'redux-form';
import { Country } from '../../../utils/country.js';
import Select from 'react-select';
import MonthYearPicker from '../../../utils/monthYearPicker';

class AdditionalField extends Component {
  constructor(props) {
    super(props);
  }

  renderTextField(field) {
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

  showBirthField(field) {
    return (
      <MonthYearPicker
        field={field}
        {...field.input}
       />
    );
  }

  comboboxResource(resource) {
    return _.map(resource, (opt) => {
      return(
        <option key={opt.id} value={opt.id}>{opt.name}</option>
      );
    });
  }

  showElement(field, payload, typeKey) {
    switch(field) {
      case "dcheckinbaggagea11":
      case "rcheckinbaggagea11":
      case "dcheckinbaggagea21":
      case "rcheckinbaggagea21":
      case "dcheckinbaggagea31":
      case "rcheckinbaggagea31":
        let fieldName = field.substring(0, 15);
        return (
          <div className="col-md-6">
            <Field name={`${fieldName}${typeKey}1`} required className="select_booking" component="select">
              <option value="">Select Baggage Size</option>
              {this.comboboxResource(payload.resource)}
            </Field>
          </div>
        );
      case "passportnationalitya1":
      case "passportissuinga1":
        let name = (field == 'passportnationalitya1') ? 'passportnationality' : 'passportissuing';
        let placeholder = (field == 'passportnationalitya1') ? 'Nationality' : 'Passport Country Issuer';
        return(
          <div className="col-md-6">
            <Field
              name={`${name}${typeKey}`}
              value="id"
              component={props =>
                <Select
                  value={props.input.value}
                  onChange={value => props.input.onChange(value)}
                  onBlur={() => props.input.onBlur(props.input.value)}
                  options={Country}
                  placeholder={placeholder}
                  className="select_booking"
                  simpleValue
                />
              }
            />
          </div>
        );
      case "passportnoa1":
        return(
          <div className="col-md-6">
            <Field
              required
              name={`passportno${typeKey}`}
              type="text"
              placeholder="Enter Passport Number..."
              component={this.renderTextField}
            />
          </div>
        );
      case "birthdatea1":
      case "passportExpiryDatea1":
      case "passportissueddatea1":
        let placeHolder = '';
        let nameField = '';

        if(field == 'birthdatea1') {
          placeHolder = 'Enter Passenger Birthdate';
          nameField = 'birthdate'
        } else if(field == 'passportExpiryDatea1') {
          placeHolder = 'Enter Passport Expired Date';
          nameField = 'passportExpiryDate';
        } else {
          placeHolder = 'Enter Passport Issued Date';
          nameField = 'passportissueddate';
        }

        return(
          <div className="col-md-6">
            <Field
              required
              name={`${nameField}${typeKey}`}
              type="text"
              placeholder={placeHolder}
              component={this.showBirthField}
            />
          </div>
        );
    }
  }

  renderField() {
    let addField = [];
    let x = 0;
    return _.map(ADDITIONAL_FIELD, (field) => {
      x++;
      if(_.has(this.props.mandatory, field)) {
        return (
          <div key={`${this.props.typeKey}${field}`}>
          {this.showElement(field, this.props.mandatory[field], this.props.typeKey)}
          </div>
        );
      }
    });
  }

  render() {
    return(
      <div>
        {this.renderField()}
      </div>
    );
  }
}

export default AdditionalField;
