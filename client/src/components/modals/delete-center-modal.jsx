import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * 
 */
export default class DeleteCenter extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

/**
 * 
 */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <button className={['waves-effect', 'waves-light', 'btn', 'red'].join(' ')} onClick={this.handleOpen}><i className=" material-icons">delete</i></button>
        <MuiThemeProvider>
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            The actions in this window were passed in as an array of React objects.
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}
