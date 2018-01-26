import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input } from 'react-materialize';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CenterActions from '../../../actions/center.action';
import Loader from './../Loader/Loader';
import FormValidator from '../forms/formInputValidator';


const centerAction = new CenterActions();
window.jQuery = window.$ = jQuery;


const facilities = [
  'CCTV',
  'VIP LOUNGE',
  'PROJECTOR',
  'MEDIA SUPPORT',
  'SECURITY',
  'WIFI'
];

const propTypes = {
  states: PropTypes.arrayOf(() => null),
  stateProps: PropTypes.objectOf(() => {
    return null;
  }),
  createCenter: PropTypes.func.isRequired,
  getCenters: PropTypes.func.isRequired
};

const defaultProps = {
  states: [],
  stateProps: {}
};
/**
 *component for create center modal
 */
class CreateCenterModal extends Component {
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
      errors: {},
      loading: false,
      message: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMultiSelect = this.onMultiSelect.bind(this);
  }

  /**
   * @param {object} nextProps
   * @returns {*} new props
   */
  componentWillReceiveProps(nextProps) {
    const { message } = this.state;
    const { getCenters } = this.props;
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
          Materialize.toast(nextProps.stateProps.response.data, 4000, 'cyan');
          $('#newCenter').modal('close');
          getCenters();
        }
      });
    } else if (nextProps.stateProps.response.error) {
      this.setState({
        loading: false
      });
      Materialize.toast(nextProps.stateProps.response.error, 4000, 'red');
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
    console.log(values);
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
    if (this.isValid() === true) {
      this.setState({
        loading: true
      });
      const { createCenter } = this.props;
      createCenter(this.state.center);
    }
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
   *@returns {*} renders the modal
   */
  render() {
    const { center, errors, loading } = this.state;
    const { states } = this.props;
    return (
      <div className="center-modal">
        <div id="newCenter" className="modal modal-fixed-footer">

          <div className="modal-content">
            <h4>Create Center</h4>
            {loading === true && <Loader />}
            <div className="row">
              <form className={['col', 'row', 's12'].join(' ')} >
                <div className={['row'].join(' ')}>
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                    <input id="image_url" type="text" name="name" value={center.name} onChange={this.onChange} className="validate" />
                    {errors.name ? <label htmlFor='image_url' className='red-text'>{errors.name}</label> : <label htmlFor='image_url'>Center Name</label>}
                  </div>
                  <Input s={6} name="stateId" value={center.stateId} onChange={this.onChange} type="select" label="States">
                    <option defaultValue="State" disabled>Select States</option>
                    {
                      states.map(state => (
                        <option
                          key={state.id}
                          value={state.id}
                        >{state.statName}
                        </option>
                      ))
                    }
                  </Input>
                </div>
                <div className="row">
                  <div className={['input-field', 'col', 's12'].join(' ')}>
                    <input id="address" type="text" className="validate" name="address" value={center.address} onChange={this.onChange} />
                    {errors.address ? <label htmlFor="address" className="red-text">{errors.address}</label> : <label htmlFor="address">Center Address</label>}
                  </div>
                </div>
                <div className="row">
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                    <input id="hall" name="hallCapacity" value={center.hallCapacity} type="number" onChange={this.onChange} className="validate" />
                    {errors.hallCapacity ? <label htmlFor="hall" className="red-text">{errors.hallCapacity}</label> : <label htmlFor="hall">Hall capacity</label>}
                  </div>
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                    <input id="carPark" name="carParkCapacity" value={center.carParkCapacity} type="number" onChange={this.onChange} className="validate" />
                    {errors.carParkCapacity ? <label htmlFor="carPark" className="red-text">{errors.carParkCapacity}</label> : <label htmlFor="carPark">Carpark Capacity</label>}
                  </div>
                </div>
                <div className="row">
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                    <MuiThemeProvider>
                      <SelectField
                        multiple
                        hintText="Select Facilities"
                        errorText={errors.facilities && <span className="red-text accent-1">{errors.facilities}</span>}
                        value={center.facilities}
                        onChange={this.onMultiSelect}
                      >
                        {this.menuItems(center.facilities)}
                      </SelectField>
                    </MuiThemeProvider>
                  </div>
                  <div className={['row'].join(' ')}>
                    <div className={['input-field', 'col', 's6'].join(' ')}>
                      <input id="price" name="price" value={center.price} type="number" onChange={this.onChange} className="validate" />
                      {errors.price ? <label htmlFor="price" className="red-text">{errors.price}</label> : <label htmlFor="price">Center Price</label>}
                    </div>
                  </div>
                </div>
                <div className={['file-field', 'input-field', 's12'].join(' ')}>
                  <div className="btn">
                    <span>Center image</span>
                    <input type="file" name="image" onChange={this.onFileChange} accept="image/*" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className={['file-path', 'validate'].join(' ')} type="text" placeholder={errors.image || 'upload image'} />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer" >
            <button className="modal-action modal-close waves-effect waves-green btn-flat ">Cancel</button>
            <button className="waves-effect waves-green btn-flat" onClick={this.onSubmit}>Create</button>
          </div>
        </div>
      </div>
    );
  }
}

CreateCenterModal.propTypes = propTypes;
CreateCenterModal.defaultProps = defaultProps;

const matchStateToProps = state => ({
  stateProps: {
    response: state.createCenter
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createCenter: centerAction.createCenter,
  getCenters: centerAction.getAll
}, dispatch);

export default connect(matchStateToProps, mapDispatchToProps)(CreateCenterModal);
