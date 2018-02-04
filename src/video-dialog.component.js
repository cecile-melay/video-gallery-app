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
            title={this.state.video.title}
            actions={actions}
            modal={false}
            open={this.state.open}
            autoScrollBodyContent={true}
            onRequestClose={() => this.handleClose(false)}
          >  
           <p><b>{this.state.video.titleVideo}</b></p>
           <iframe title="video-youtube" width="100%" height="315" src={this.state.video.embedURL} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
           <p dangerouslySetInnerHTML={ {__html: this.state.video.description } }   style={{"overflow":"hidden","textOverflow":"ellipsis","whiteSpace":"nowrap","width":"500px"}}  />
           <p><b>Genre :</b> {this.state.video.genre}</p>
           <p><b>Channel :</b> {this.state.video.owner}</p>
           <p><b>Published :</b> {this.state.video.datePublished}</p>
           <p><b>Duration :</b> {this.state.video.duration} sec</p>
           <p><b>Views :</b> {this.state.video.views}</p>
          </Dialog>

          <UpdateVideoDialog handleClose={this.handleClose} ref={(updateVideoDialog) => { this._updateVideoDialog = updateVideoDialog; }}></UpdateVideoDialog>

        </div>
      );
    }
  }