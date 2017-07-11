import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchHotelList } from '../../../actions/actionHotel';

class SearchHotel extends Component {
  renderTextField(field) {
    return (
      <li>
        <div className="form-group">
          <input type="text" name={field.name} className="form-control" placeholder={field.placeholder} required />
        </div>
      </li>
    );
  }

  render () {
    return (
      <div>
        <h3>Search and Book Hotels in Bali</h3>
        <form>
          <ul className="list-inline list-unstyled">
            <Field
              name="name"
              placeholder="Enter hotel name"
              component={this.renderTextField}
            />
            <li>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Check In" id="datepicker3" required />
              </div>
            </li>
            <li>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Check Out" id="datepicker4" required />
              </div>
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
  connect(null, {fetchHotelList}) (SearchHotel)
);
