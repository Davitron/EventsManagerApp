import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Modal, Icon } from 'react-materialize';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CenterActions from '../../../actions/center.action';
import Loader from './../Loader/Loader';

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
  states: PropTypes.array,
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
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMultiSelect = this.onMultiSelect.bind(this);
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
   * @param {*} values
   * @returns {*}
   * this handles population facilities in a select box
   */
  menuItems(values) {
    return facilities.map(facility => (
      <MenuItem
        key={facility}
        insetChildren={true}
        checked={values && values.indexOf(facility) > -1}
        value={facility}
        primaryText={facility}
      />
    ));
  }
  /**
   *
   * @param {*} event
   * @returns {*}
   * this handles the event when form is submitted
   */
  onSubmit(event) {
    event.preventDefault();
    const { createCenter } = this.props;
    this.props.dipatch(centerAction.createCenter(this.state.center));
  }

  /**
   *@returns {*} renders the modal
   */
  render() {
    const { center } = this.state;
    const { states } = this.props;
    return (
      <div className='center-modal'>
        <div id='createCenter' className='modal' ref={(md) => { this.modal = md; }}>

          <div className='modal-content'>
            <h4>Create Center</h4>
            <div className='row'>
              <form className={['col', 'row', 's12'].join(' ')} onSubmit={this.onSubmit}>
                <div className={['row'].join(' ')}>
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                    <input id='image_url' type='text' name='name' value={center.name} onChange={this.onChange} className='validate'></input>
                    <label htmlFor='image_url'>Center Name</label>
                  </div>
                  <Input s={6} name='stateId' value={center.stateId} onChange={this.onChange} type='select' label='States'>
                    <option defaultValue='State' disabled>Select States</option>
                    {
                      states.map((state) => {
                        return <option key={state.id}
                          value={state.id}>{state.statName}</option>;
                      })
                    }
                  </Input>
                </div>
                <div className='row'>
                  <div className={['input-field', 'col', 's12'].join(' ')}>
                    <input id='address' type='text' className='validate' name='address' value={center.address} onChange={this.onChange}></input>
                    <label htmlFor='address'>Address</label>
                  </div>
                </div>
                <div className='row'>
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                    <input id='hall' name='hallCapacity' value={center.hallCapacity} type='number' onChange={this.onChange} className='validate'></input>
                    <label htmlFor='hall'>Hall Capacity</label>
                  </div>
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                      <input id='carPark' name='carParkCapacity' value={center.carParkCapacity} type='number' onChange={this.onChange} className='validate'></input>
                      <label htmlFor='carPark'>Parking Capactiy</label>
                  </div>
                </div>
                <div className='row'>
                  <div className={['input-field', 'col', 's12'].join(' ')}>
                    <MuiThemeProvider>
                      <SelectField
                        multiple={true}
                        hintText="Select Facilities"
                        value={center.facilities}
                        onChange={this.onMultiSelect}
                      >
                        {this.menuItems(center.facilities)}
                      </SelectField>
                    </MuiThemeProvider>
                  </div>
                </div>
                <div className={['row'].join(' ')}>
                  <div className={['input-field', 'col', 's12'].join(' ')}>
                    <input id='image_url' name='price' value={center.price} type='number' onChange={this.onChange} className='validate'></input>
                    <label htmlFor='image_url'>Price</label>
                  </div>
                </div>
                <div className={['file-field', 'input-field', 's12'].join(' ')}>
                  <div className='btn'>
                    <span>Center image</span>
                    <input type='file' name='image' onChange={this.onFileChange} accept='image/*'></input>
                  </div>
                  <div className='file-path-wrapper'>
                    <input className={['file-path', 'validate'].join(' ')} type='text'></input>
                  </div>
                </div>
                <div className=''>
                <button className={['col', 's12', 'l12', 'btn', 'btn-large', 'waves-effect'].join(' ')}
                  disabled='' onClick={this.onSubmit}>Create</button>
                </div>
              </form>
              <div className='row'>
                <button className={['col', 's12', 'l12', 'modal-action', 'modal-close', 'waves-effect', 'btn', 'btn-large', 'red'].join(' ')}>
                  Cancel</button>
              </div>
            </div>
          </div>
          {/* <div className='modal-footer'>

                Cancel</button>
          </div> */}
        </div>
      </div>
    );
  }
}

CreateCenterModal.propTypes = propTypes;
export default CreateCenterModal;
