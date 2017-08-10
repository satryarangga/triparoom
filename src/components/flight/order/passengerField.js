import React, { Component } from 'react';
import { Field, formValueSelector } from 'redux-form';
import AdditionalField from './additionalField';
import _ from 'lodash';
import MonthYearPicker from '../../../utils/monthYearPicker';

const renderTextField = (field) => {
  return (
    <div className="form-group">
      <label>{field.label}</label>
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

const showBirthField = (field) => {
  return (
    <MonthYearPicker
      field={field}
      minmax={field.minmax}
      {...field.input}
     />
  );
}

const renderFields = (type, typeKey, count, mandatory) => {

  return (
    <div key={`${typeKey}${count}`}>
      <div className="col-md-12 margin-bottom-10">
        <span className="passenger-head">Penumpang {type} #{count}</span>
      </div>
      <div className="col-md-6">
          <label>Titel</label>
          <Field name={`title${typeKey}${count}`} required className="select_booking" component="select">
            <option value="">Pilih Panggilan Penumpang</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
          </Field>
      </div>
      <div className="col-md-6">
          <Field
            name={`firstname${typeKey}${count}`}
            type="text"
            label="Nama Depan"
            placeholder="Masukkan Nama Depan Penumpang"
            component={renderTextField}
          />
      </div>
      <div className="col-md-6">
          <Field
            name={`lastname${typeKey}${count}`}
            label="Nama Belakang"
            type="text"
            placeholder="Masukkan Nama Belakang Penumpang"
            component={renderTextField}
          />
      </div>

      <div className="col-md-6">
          <Field
            name={`birthdate${typeKey}${count}`}
            minmax=""
            label= "Tanggal Lahir"
            type="text"
            placeholder="Masukkan Tanggal Lahir"
            component={showBirthField}
          />
      </div>

      <AdditionalField
        mandatory={mandatory}
        typeKey={typeKey}
        count={count}
       />

    </div>
  );
}

export const adultPassenger = (mandatory, countAdult) => {
  return _.map(_.times(countAdult), (a) => {
    return renderFields('Dewasa', 'a', a+1, mandatory);
  });
}

export const childPassenger = (mandatory, countChild) => {
  return _.map(_.times(countChild), (c) => {
    return renderFields('Anak', 'c', c+1, mandatory);
  });
}

export const infantPassenger = (mandatory, countInfant) => {
  return _.map(_.times(countInfant), (i) => {
    return renderFields('Bayi', 'i', i+1, mandatory);
  });
}
