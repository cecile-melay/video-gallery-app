import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class AddVideoDialog extends React.Component {

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

       

      const actions = [
        <FlatButton
          label="Annuler"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Envoyer"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleClose}
        />,
      ];
  
      return (
        <div>
          
          <Dialog
            title="Ajouter une vidéo"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >

          

        <TextField hintText="Nom"  /><br/>
        <TextField hintText="Description" /><br/>
        <TextField hintText="Votre nom ou pseudo" /><br/>
        <TextField  hintText="URL de la vidéo avec (lien embed)"  /><br/>
            
            </Dialog>
        </div>
      );
    }
  }

//   <input
//   type="text" 
//   value={this.state.input}
//   placeholder="URL de la vidéo"/>