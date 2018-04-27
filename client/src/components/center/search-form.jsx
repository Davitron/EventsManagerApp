import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const facilities = [
  { key: '1', text: 'CCTV', value: 'cctv' },
  { key: '2', text: 'Vip Lounge', value: 'vip lounge' },
  { key: '3', text: 'Projector', value: 'projector' },
  { key: '4', text: 'Security', value: 'security' },
  { key: '5', text: 'WIFI', value: 'wifi' }
];

/**
 * @class
 */
class SearchForm extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      query: {},
      states: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderLabel = this.renderLabel.bind(this);
  }


  /**
   *
   * @param {*} nextProps
   *
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.states !== this.props.states && nextProps.states.length > 0) {
      const options = nextProps.states.map((state) => {
        const newObj = {};
        newObj.key = state.id;
        newObj.text = state.stateName;
        newObj.value = state.id;
        return newObj;
      });
      options.unshift({ key: 'all', text: 'State', value: null });
      this.setState({ states: options });
    }
  }

  /**
   *
  *
  * @param {object} event
  *
  * @param {object} data
  *
  * @returns {void}
  *
  * this handles the event when any property in the state changes
  */
  onChange(event, data) {
    const { value, name } = data;
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        [name]: value
      }
    });
  }

  /**
  * @param {object} event
  *
  * @returns {void}
  *
  * this handles the event when form is submitted
  */
  onSubmit(event) {
    event.preventDefault();
    const { query } = this.state;
    if (query.state === null) delete query.state;
    this.props.onSearch(query);
  }

  /**
   *
   * @param {*} label
   *
   * @returns {object} selected
   */
  renderLabel(label) {
    return {
      color: 'blue',
      content: label.text,
      icon: 'check',
    };
  }

  /**
   * @returns {view} - html
   */
  render() {
    const { states } = this.state;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Input name="search" fluid placeholder="Name or Addres" onChange={this.onChange} />
          <Form.Select options={states} name="state" fluid placeholder="State" onChange={this.onChange} />
          <Form.Input type="number" name="capacity" fluid placeholder="Capacity" onChange={this.onChange} />
          <Form.Dropdown
            multiple
            selection
            name="facilities"
            fluid
            options={facilities}
            placeholder="Choose an option"
            renderLabel={this.renderLabel}
            onChange={this.onChange}
          />
          <Form.Button primary fluid onClick={this.onSubmit}>Search</Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  states: PropTypes.arrayOf(() => null)
};

SearchForm.defaultProps = {
  states: []
};

export default SearchForm;
