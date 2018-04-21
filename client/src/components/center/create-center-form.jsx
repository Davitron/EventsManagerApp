import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Input, Row } from 'react-materialize';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CenterActions from '../../actions/center-action';
import Loader from '../reusables/loader';
import FormValidator from '../../helpers/form-validator';
import history from '../../helpers/history';
import Header from '../header';
import Toast from '../../helpers/toast';

const facilities = [
  'CCTV',
  'VIP LOUNGE',
  'PROJECTOR',
  'MEDIA SUPPORT',
  'SECURITY',
  'WIFI'
];

const propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  createCenter: PropTypes.func.isRequired,
};

const defaultProps = {
  stateProps: {}
};
/**
 *component for create center modal
 */
class CreateCenterForm extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      center: {
        name: '',
        price: '',
        address: '',
        image: undefined,
        hallCapacity: '',
        carParkCapacity: '',
        stateId: '',
        facilities: []
      },
      states: [],
      errors: {},
      loading: false,
      message: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMultiSelect = this.onMultiSelect.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  /**
   *
   * @returns {*} new props
   */
  componentWillMount() {
    axios.get('/api/v1/states')
      .then((response) => {
        this.setState({ states: response.data });
      });
  }

  /**
   * @param {object} nextProps
   * @returns {*} new props
   */
  componentWillReceiveProps(nextProps) {
    const { message } = this.state;
    if (nextProps.stateProps.response.data !== message) {
      this.setState({
        message: nextProps.stateProps.response.data
      }, () => {
        if (nextProps.stateProps.response.data) {
          this.setState({
            loading: false,
            center: {
              name: '',
              price: '',
              address: '',
              image: undefined,
              hallCapacity: '',
              carParkCapacity: '',
              stateId: '',
              facilities: []
            }
          });
          history.push('/centers');
        }
      });
    } else if (nextProps.stateProps.response.status === 'failed') {
      this.setState({
        loading: false
      });
    }
  }


  /**
  *@param {*} event
  *@returns {*}
  *this handles the event when any property in the state changes
  */
  onChange(event) {
    const { name, value } = event.target;
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
   *
   * @param {*} event
   * @param {*} index
   * @param {*} values
   * @returns {*} handles selecttion of facilities
   */
  onMultiSelect(event, index, values) {
    const { center } = this.state;
    this.setState({
      center: {
        ...center,
        facilities: values
      }
    });
  }

  /**
   *
   * @param {*} event
   * @returns {*}
   * this handles the event when form is submitted
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const fv = new FormValidator();
    const { createCenter } = this.props;
    const errors = fv.validateCenterForm(this.state.center);
    if (errors) {
      this.setState({
        errors
      }, () => {
        this.setState({ loading: false });
        const message = Object.values(this.state.errors).join('\n');
        Toast.error(message);
      });
    } else {
      // Logger.log(createUser);
      createCenter(this.state.center);
    }
    // if (this.isValid() === true) {
    //   this.setState({
    //     loading: true
    //   });
    //   const { createCenter } = this.props;
    //   createCenter(this.state.center);
    // }
  }

  /**
   *@returns {*} check if form imputs are valid
   */
  isValid() {
    let validity = true;
    const formValidator = new FormValidator();
    const { errors, isValid } = formValidator.validateCenterInput(this.state.center);
    if (isValid === false) {
      this.setState({ errors });
      validity = false;
      return validity;
    }
    return validity;
  }

  /**
   *
   * @param {*} values
   * @returns {*}
   * this handles population facilities in a select box
   */
  menuItems(values) {
    return facilities.map(facility => (
      <MenuItem
        key={facility}
        insetChildren
        checked={values && values.indexOf(facility) > -1}
        value={facility}
        primaryText={facility}
      />
    ));
  }

  /**
  *@param {*} e
  *@returns {*}
  *return to previous page
  */
  goBack(e) {
    e.preventDefault();
    history.goBack();
  }

  /**
   *@returns {*} renders the modal
   */
  render() {
    const {
      center,
      errors,
      loading,
      states
    } = this.state;
    return (
      <div>
        <div style={{
          backgroundColor: '#f5f5f5',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          paddingBottom: '20px',
          overflow: 'auto'
        }}
        >
          <Header />
          <div className="container">
            <Row>
              <div className="card-panel white contain2 animated bounceInRight">
                <div className="title">Create New Center</div>
                {loading && <Loader />}
                <div className={['row'].join(' ')}>
                  <Input l={6} s={12} m={12} id="image_url" type="text" name="name" value={center.name} onChange={this.onChange} className="validate" label="Center Name" />
                  <Input l={6} s={12} m={12} name="stateId" value={center.stateId} onChange={this.onChange} type="select" label="States">
                    <option defaultValue="State" disabled>Select States</option>
                    {
                      states.map(state => (
                        <option
                          key={state.id}
                          value={state.id}
                        >{state.stateName}
                        </option>
                      ))
                    }
                  </Input>
                </div>
                <div className="row">
                  <Input l={6} s={12} m={12} id="address" type="text" className="validate" name="address" value={center.address} onChange={this.onChange} label="Center Address" />
                  <Input l={6} s={12} m={12} id="price" name="price" value={center.price} type="number" onChange={this.onChange} className="validate" label="Center Price" />
                </div>
                <div className="row">
                  <Input l={6} s={12} m={12} id="hall" name="hallCapacity" value={center.hallCapacity} type="number" onChange={this.onChange} className="validate" label="Hall Capacity" />
                  <Input l={6} s={12} m={12} id="carPark" name="carParkCapacity" value={center.carParkCapacity} type="number" onChange={this.onChange} className="validate" label="Carpark Capacity" />
                </div>
                <div className="row">
                  <div className={['input-field', 'col', 's12'].join(' ')}>
                    <MuiThemeProvider>
                      <SelectField
                        multiple
                        hintText="Select Facilities"
                        errorText={errors.facilities && <span className="red-text accent-1">{errors.facilities}</span>}
                        value={center.facilities}
                        fullWidth
                        onChange={this.onMultiSelect}
                      >
                        {this.menuItems(center.facilities)}
                      </SelectField>
                    </MuiThemeProvider>
                  </div>
                </div>
                <div className={['file-field', 'input-field', 's12'].join(' ')}>
                  <div className="btn action-button">
                    <span>Center image</span>
                    <input type="file" name="image" onChange={this.onFileChange} accept="image/*" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className={['file-path', 'validate'].join(' ')} type="text" placeholder={errors.image || 'upload image'} />
                  </div>
                </div>
                <Row className="center">
                  <button
                    className="btn waves-effect waves-light btn-large action-button"
                    onClick={this.onSubmit}
                    disabled={
                      !center.name ||
                      !center.address ||
                      !center.carParkCapacity ||
                      !center.hallCapacity ||
                      !center.stateId ||
                      !center.price ||
                      !center.facilities ||
                      !center.image
                    }
                  >
                    Create
                  </button>
                  <button className="btn waves-effect waves-light red btn-large" onClick={this.goBack} style={{ marginLeft: '5px' }} >Back
                  </button>
                </Row>
              </div>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

CreateCenterForm.propTypes = propTypes;
CreateCenterForm.defaultProps = defaultProps;

const matchStateToProps = state => ({
  stateProps: {
    response: state.create,
    states: state.getAllStates,
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createCenter: CenterActions.createCenter,
  getStates: CenterActions.getAllStates
}, dispatch);

export default connect(matchStateToProps, mapDispatchToProps)(CreateCenterForm);
