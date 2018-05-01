import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CenterActions from '../../actions/center-action';


const facilities = [
  { key: '1', text: 'CCTV', value: 'cctv' },
  { key: '2', text: 'Vip Lounge', value: 'vip lounge' },
  { key: '3', text: 'Projector', value: 'projector' },
  { key: '4', text: 'Security', value: 'security' },
  { key: '5', text: 'WIFI', value: 'wifi' }
];

const propTypes = {
  response: PropTypes.objectOf(() => null), // eslint-disable-line
  onSubmit: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  center: PropTypes.objectOf(() => null),
  states: PropTypes.arrayOf(() => null),
  errors: PropTypes.objectOf(() => null).isRequired,
  open: PropTypes.bool.isRequired,
  isRequestMade: PropTypes.bool
};

const defaultProps = {
  response: {},
  center: {},
  states: [],
  isRequestMade: false
};

// const fileValidation = (file) => {
//   if ((/\.(jpg|jpeg|png)$/i).test(file.name)) {
//     return true;
//   }
//   return false;
// };

/**
 *component for create center modal
 */
class CenterFormModal extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      center: {},
      states: [],
      errors: {},
      loading: false,
      open: false,
      mode: 'create'
    };

    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  /**
   * @param {object} nextProps
   * @returns {*} new props
   */
  componentWillReceiveProps(nextProps) {
    const {
      open,
      states,
      center,
      errors,
      isRequestMade
    } = nextProps;

    if (open !== this.state.open && states !== this.state.states) {
      const options = nextProps.states.map((state) => {
        const newObj = {};
        newObj.key = state.id;
        newObj.text = state.stateName;
        newObj.value = state.id;
        return newObj;
      });
      options.unshift({ key: 'all', text: 'State', value: null });
      this.setState({ open, states: options, errors, });
    }

    if (errors !== this.props.errors) {
      this.setState({ errors });
    }

    if (center !== this.props.center) {
      this.setState({ center, mode: 'update' });
    }

    if (isRequestMade !== this.props.isRequestMade) {
      this.setState({ loading: isRequestMade });
    }
  }


  /**
  * @param {object} event
  * @param {object} data
  *@returns {void}
  *this handles the event when any property in the state changes
  */
  onChange(event, data) {
    const { name, value } = data;
    const { center } = this.state;
    this.setState({
      center: {
        ...center,
        [name]: value
      }
    });
  }

  /**
  *@param {*} event
  *@returns {*}
  *this handles the event when any property in the state changes
  */
  onFileChange(event) {
    const { name, files } = event.target;
    const { center } = this.state;
    this.setState({
      center: {
        ...center,
        [name]: files[0]
      }
    });
  }


  /**
   * @returns {void}
   */
  onSubmit() {
    this.props.onSubmit(this.state.center);
  }

  /**
   * @returns {void}
   */
  hideModal() {
    this.props.hideModal();
  }

  /**
   *@returns {*} renders the modal
   */
  render() {
    const {
      center,
      errors,
      loading,
      states,
      open,
      mode
    } = this.state;
    return (
      <div>
        <Modal size="small" open={open} onClose={this.close}>
          <Modal.Header>
            {mode === 'create' ? 'Create Center' : 'Update Center' }
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  error={errors.name ? true : false}
                  defaultValue={center.name ? center.name : ''}
                  label={errors.name ? errors.name[0] : 'Center Name'}
                  placeholder="First name"
                  onChange={this.onChange}
                  name="name"
                />
                <Form.Select
                  options={states}
                  error={errors.stateId ? true : false}
                  defaultValue={center.stateId ? center.stateId : ''}
                  label={errors.stateId ? errors.stateId[0] : 'State'}
                  placeholder="State"
                  onChange={this.onChange}
                  name="stateId"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  error={errors.address ? true : false}
                  defaultValue={center.address ? center.address : ''}
                  label={errors.address ? errors.address[0] : 'Center Address'}
                  placeholder="Address"
                  onChange={this.onChange}
                  name="address"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  type="number"
                  fluid
                  error={errors.hallCapacity ? true : false}
                  defaultValue={center.hallCapacity ? center.hallCapacity : ''}
                  label={errors.hallCapacity ? errors.hallCapacity[0] : 'Hall Capacity'}
                  placeholder="Hall Capacity"
                  onChange={this.onChange}
                  name="hallCapacity"
                />
                <Form.Input
                  type="number"
                  fluid
                  error={errors.carParkCapacity ? true : false}
                  defaultValue={center.carParkCapacity ? center.carParkCapacity : ''}
                  label={errors.carParkCapacity ? errors.carParkCapacity[0] : 'Carpark Capacity'}
                  placeholder="Carpark Capacity"
                  onChange={this.onChange}
                  name="carParkCapacity"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  type="number"
                  error={errors.price ? true : false}
                  label={errors.price ? errors.price[0] : 'Price'}
                  defaultValue={center.price ? center.price : ''}
                  fluid
                  placeholder="Price"
                  onChange={this.onChange}
                  name="price"
                />
                <div className="field">
                  <label style={errors.image && { color: '#9f3a38' }}>{errors.image ? errors.image[0] : 'Image'}</label>
                  <div className="ui field input">
                    <input type="file" accept="image/*" label="Image" placeholder="Upload an Image" onChange={this.onFileChange} name={center.image ? 'newImage' : 'image'} />
                  </div>
                </div>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Dropdown
                  multiple
                  selection
                  error={errors.facilities ? true : false}
                  label={errors.facilities ? errors.facilities[0] : 'Facilities'}
                  name="facilities"
                  defaultValue={center.facilities ? center.facilities : ''}
                  fluid
                  options={facilities}
                  placeholder="Choose an option"
                  renderLabel={this.renderLabel}
                  onChange={this.onChange}
                />
              </Form.Group>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.hideModal}>
              Cancel
            </Button>
            <Button
              primary
              icon="checkmark"
              disabled={loading}
              loading={loading}
              labelPosition="right"
              content={mode === 'create' ? 'create' : 'update'}
              onClick={this.onSubmit}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

CenterFormModal.propTypes = propTypes;
CenterFormModal.defaultProps = defaultProps;

const matchStateToProps = state => ({
  response: {
    center: state.create,
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createCenter: CenterActions.createCenter,
}, dispatch);

export default connect(matchStateToProps, mapDispatchToProps)(CenterFormModal);
