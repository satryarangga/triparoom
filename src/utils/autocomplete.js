import React, { Component } from 'react';
import { Autocomplete } from 'material-ui';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.state = {
      dataSource: [],
      inputValue: ''
    }
  }

  onUpdateInput (inputValue) {
  }

  render() {
    return (
      <Autocomplete
        dataSource = {this.state.dataSource}
        onUpdateInput = {this.onUpdateInput}
      />
    );
  }
}

export default Autocomplete;
