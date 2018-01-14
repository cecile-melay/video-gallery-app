import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export default class DialogExampleSimple extends React.Component {

  //Declare global variable
    state = {
      open: false,
      video: [],
      details: []
    };

    /**
     * Open Dialog
     */
    handleOpen = (el) => {

        this.state.video = el;

        //get data of video with deep 2 for access in the render method
        this.state.details = el.details;
      this.setState({open: true});
    };
  
    /**
     * Close Dialog
     */
    handleClose = () => {
      this.setState({open: false});
    };
  
    render() {

        console.log(this.state.video);

      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleClose}
        />,
      ];
  
      return (
        <div>
          <RaisedButton label="Dialog" onClick={this.handleOpen} />
          <Dialog
            title={this.state.video.name}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
      
           {this.state.details.description}
            <iframe width="560" height="315" src="https://www.youtube.com/embed/cW7yK0fCl4Y" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </Dialog>
        </div>
      );
    }
  }