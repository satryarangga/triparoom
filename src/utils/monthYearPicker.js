import React from 'react';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear - 70, 0);
const toMonth = new Date(currentYear, 0);

// Component will receive date, locale and localeUtils props
function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <div className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => <option key={i} value={i}>{month}</option>)}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map((year, i) =>
          <option key={i} value={year}>
            {year}
          </option>
        )}
      </select>
    </div>
  );
}

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.changeDate = this.changeDate.bind(this);
  }

  state = {
    month: fromMonth,
    onOpen: false,
    selectedDay: '',
    selectedDayText: '',
  };

  handleYearMonthChange = month => {
    this.setState({ month });
  };

  renderPicker() {
    this.setState({
      onOpen: true
    });
  }

  removePicker() {
    this.setState({
      onOpen: false
    });
  }

  handleDayClick = (day, { selected }) => {
    this.setState({
      selectedDay: selected ? undefined : moment(day).format('YYYY/MM/DD'),
      onOpen: false
    });
    let selectedDay = selected ? undefined : moment(day).format('YYYY/MM/DD');
    this.props.field.input.onChange(selectedDay);
  };

  changeDate(event) {
    this.setState({selectedDayText: event.target.value});
  }

  showDatePicker() {
    if(this.state.onOpen) {
      return (
        <div className="YearNavigation">
          <DayPicker
            month={this.state.month}
            fromMonth={fromMonth}
            toMonth={toMonth}
            captionElement={
              <YearMonthForm onChange={this.handleYearMonthChange} />
            }
            onDayClick={this.handleDayClick}
          />
        </div>
      );
    }
    return;
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <input
            required
            name={this.props.field.name}
            placeholder={this.props.field.placeholder}
            {...this.props.field.input}
            className="form-control"
            onFocus={this.renderPicker.bind(this)}
          />
        </div>
        {this.showDatePicker()}
      </div>
    );
  }
}
