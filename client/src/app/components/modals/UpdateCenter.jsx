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
  selectedCenter: PropTypes.objectOf(() => null),
  updateCenter: PropTypes.func.isRequired,
  getCenters: PropTypes.func.isRequired,
  stateProps: PropTypes.objectOf(() => {
    return null;
  }),
};

const defaultProps = {
  states: [],
  selectedCenter: {},
  stateProps: {},
};
/**
 *component for create center modal
 */
class UpdateCenterModal extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      center: {},
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
   * @returns {*} set value of props to center on initial render
   */
  componentWillMount() {
    this.setState({
      center: this.props.selectedCenter
    });
  }

  /**
   *
   * @param {*} nextProps
   * @returns {*} to set state when props changes
   */
  componentWillReceiveProps(nextProps) {
    const { message } = this.state;
    const { getCenters } = this.props;
    if (nextProps.selectedCenter !== this.props.selectedCenter) {
      const facilitiesArr = nextProps.selectedCenter.facilities.map(f => f.toUpperCase());
      this.setState({
        center: {
          id: nextProps.selectedCenter.id,
          name: nextProps.selectedCenter.name,
          address: nextProps.selectedCenter.address,
          stateId: nextProps.selectedCenter.stateId.toString(),
          hallCapacity: nextProps.selectedCenter.hallCapacity.toString(),
          carParkCapacity: nextProps.selectedCenter.carParkCapacity.toString(),
          price: nextProps.selectedCenter.price.toString(),
          image: {},
          facilities: facilitiesArr
        }
      });
    }
    if (nextProps.stateProps.response.data !== message) {
      this.setState({
        message: nextProps.stateProps.response.data
      }, () => {
        if (nextProps.stateProps.response.data) {
          this.setState({
            loading: false
          });
          Materialize.toast(nextProps.stateProps.response.data, 6000, 'cyan');
          setTimeout(() =>  $('#updateCenter').modal('close'), 6000);
          getCenters();
        }
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
    console.log('hey!!');
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
    console.log(this.state.center);
    if (this.isValid() === true) {
      this.setState({
        loading: true
      });
      const { updateCenter } = this.props;
      updateCenter(this.state.center);
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
    const { errors, loading, center } = this.state;
    const { states, selectedCenter } = this.props;
    return (
      <div className="center-modal">
        <div id="updateCenter" className="modal modal-fixed-footer" ref={(md) => { this.modal = md; }}>

          <div className="modal-content">
            <h4>Update Center</h4>
            {loading === true && <Loader />}
            <div className="row">
              <form className={['col', 'row', 's12'].join(' ')} onSubmit={this.onSubmit}>
                <div className={['row'].join(' ')}>
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                    <input id="image_url" type="text" name="name" value={!center.name ? '' : center.name} onChange={this.onChange} className="validate" />
                    {errors.name ? <label htmlFor="image_url" className="red-text active">{errors.name}</label> : <label htmlFor="image_url" className={center.name && 'active'}>Center Name</label>}
                  </div>
                  <Input s={6} name="stateId" value={!center.stateId ? '' : center.stateId} onChange={this.onChange} type="select" label="States">
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
                    <input id="address" type="text" className="validate" name="address" value={!center.address ? '' : center.address} onChange={this.onChange} />
                    {errors.address ? <label htmlFor="address" className="red-text active">{errors.address}</label> : <label htmlFor="address" className={center.address && 'active'}>Center Address</label>}
                  </div>
                </div>
                <div className="row">
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                    <input id="hall" name="hallCapacity" value={!center.hallCapacity ? '' : center.hallCapacity} type="number" onChange={this.onChange} className="validate" />
                    {errors.hallCapacity ? <label htmlFor="hall" className="red-text active">{errors.hallCapacity}</label> : <label htmlFor="hall" className={center.hallCapacity && 'active'}>Hall capacity</label>}
                  </div>
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                    <input id="carPark" name="carParkCapacity" value={!center.carParkCapacity ? '' : center.carParkCapacity} type="number" onChange={this.onChange} className="validate" />
                    {errors.carParkCapacity ? <label htmlFor="carPark" className="red-text active">{errors.carParkCapacity}</label> : <label htmlFor="carPark" className={center.carParkCapacity && 'active'}>Carpark Capacity</label>}
                  </div>
                </div>
                <div className="row">
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                    <MuiThemeProvider>
                      <SelectField
                        multiple
                        hintText="Select Facilities"
                        errorText={errors.facilities && <span className="red-text accent-1">{errors.facilities}</span>}
                        value={center.facilities && center.facilities}
                        onChange={this.onMultiSelect}
                      >
                        {this.menuItems(center.facilities)}
                      </SelectField>
                    </MuiThemeProvider>
                  </div>
                  <div className={['row'].join(' ')}>
                    <div className={['input-field', 'col', 's6'].join(' ')}>
                      <input id="price" name="price" value={!center.price ? '' : center.price} type="number" onChange={this.onChange} className="validate" />
                      {errors.price ? <label htmlFor="price" className="red-text active">{errors.price}</label> : <label htmlFor="price" className={selectedCenter.price && 'active'}>Center Price</label>}
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
            <button className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</button>
            <button className="waves-effect waves-green btn-flat" onClick={this.onSubmit}>Create</button>
          </div>
        </div>
      </div>
    );
  }
}

UpdateCenterModal.propTypes = propTypes;
UpdateCenterModal.defaultProps = defaultProps;

const matchStateToProps = state => ({
  stateProps: {
    response: state.updateCenter
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCenter: centerAction.updateCenter,
  getCenters: centerAction.getAll
}, dispatch);

export default connect(matchStateToProps, mapDispatchToProps)(UpdateCenterModal);
