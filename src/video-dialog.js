import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export default class VideoDialog extends React.Component {

    //Declare global variable
    state = {
      open: false,
      video: [],
      details: {description:'Aucune description'}
    };

    /**
     * Open Dialog
     */
    handleOpen = (el) => {

      //Initialise video data
      this.state.video = [];
      this.state.details = {description:'Aucune description'}
      
      //Set video data content for the video to display
      this.state.video = el;

      //get data of video with deep 2 for access in the render method
      if (el.details.description) {
        this.state.details.description = el.details.description;
      }
        
      this.setState({open: true});
    };
  
    /**
     * Close Dialog
     */
    handleClose = () => {
      this.setState({open: false});
    };
  
    render() {
      const actions = [
        <FlatButton
          label="OK"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleClose}
        />,
      ]; 
      return (
        <div>       
          <Dialog
            title={this.state.video.name}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >    
            {this.state.details.description}
            <iframe width="560" height="315" src={this.state.video.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </Dialog>
        </div>
      );
    }
  }