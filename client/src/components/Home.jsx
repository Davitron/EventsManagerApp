import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import Proptypes from 'prop-types';

/**
 *
 */
class Home extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  /**
   *
   * @param {object} event
   * @returns {void}
   */
  onChange(event) {
    const { value } = event.target;
    this.setState({
      search: value
    });
  }

  /**
   *
   * @param {*} event
   * @return {void}
   */
  onKeyPress(event) {
    const { search } = this.state;
    if (event.key === 'Enter' && search.trim().length !== 0) {
      this.onSearch();
    }
  }

  /**
   *
   * @param {object} event
   * @returns {void}
   */
  onSearch() {
    const { search } = this.state;
    this.props.history.push(`/centers?search=${search}`);
  }

  /**
   * @returns {*} view
   */
  render() {
    return (
      <div id="home">
        <div className="home">
          <div className="section section__hero" style={{ color: 'white' }}>
            <div className="my-container" style={{ paddingTop: '8em' }}>
              <h2 className="animated fadeInUp">Welcome to Evento.</h2>
              <h3 style={{ paddingBottom: '60px' }} className="animated fadeInUp">The perfect place to find and book event centres</h3>
              <div className="landing-input">
                <Input fluid size="huge" type="text" onKeyPress={this.onKeyPress} onChange={this.onChange} placeholder="Search by name or address" action>
                  <input />
                  <Button disabled={this.state.search.length === 0} onClick={this.onSearch} type="submit">Search</Button>
                </Input>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: Proptypes.objectOf(Proptypes.any).isRequired
};

export default Home;
