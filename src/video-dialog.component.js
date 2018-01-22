import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Custom react component
 */
import UpdateVideoDialog from'./update-video-dialog.component';


export default class VideoDialog extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }
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
      this.setState({
         //Initialise video data
        details : {description:'Aucune description'},
        //Set video data content for the video to display
        video : el,
        open: true});

      //get data of video with deep 2 for access in the render method
      if (el.details.description) {
        this.details.setState({
         description : el.details.description
        });
      }
    };
  
    /**
     * Close Dialog
     */
    handleClose(reloadData) {
      if(reloadData === true) {
        this.props.loadData();
      }
      this.setState({open: false});
    };
  
    /**
     * Open dialog to update 
     * the current selected video
     */
    openUpdateVideoDialog = (el) => {
      this._updateVideoDialog.handleOpen(el);
    };  

    render() {
      const actions = [
        <FlatButton
          label="OK"
          primary={true}
          onClick={() => this.handleClose(false)}
        />,
        <FlatButton
        label="Modifier"
        primary={true}
        onClick={(e) => this.openUpdateVideoDialog(this.state.video, e)}
      />,
      ]; 
      return (
        <div>       
          <Dialog
            title={this.state.video.name}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={() => this.handleClose(false)}
          >    
            {this.state.details.description}
            <iframe title="video-youtube" width="560" height="315" src={this.state.video.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </Dialog>

          <UpdateVideoDialog handleClose={this.handleClose} ref={(updateVideoDialog) => { this._updateVideoDialog = updateVideoDialog; }}></UpdateVideoDialog>

        </div>
      );
    }
  }