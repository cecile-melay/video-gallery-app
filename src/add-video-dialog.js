import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class AddVideoDialog extends React.Component {

  //Declare global variable
    state = {
      open: false,
      video: [],
      details: [],
      name:"hello",
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

    handleSubmit = () => {
        
        console.log(this.state.name);

        fetch('http://localhost:8080/api/addvideo', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.name,
            description: '',
            user:'',
            url: 'yourOtherValue',
          })
        })

      }
    
  
    render() {

       

      const actions = [      
        <FlatButton
          label="Envoyer"
          primary={true}
          onClick={this.handleSubmit}
        />,
        <FlatButton
        label="OK"
        primary={true}
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


        <form onSubmit={this.handleSubmit}>
            <TextField type="text" value={this.state.name}  hintText="Nom"  /><br/>
            <TextField type="text" value={this.state.description}  hintText="Description" /><br/>
            <TextField type="text" value={this.state.user}  hintText="Votre nom ou pseudo" /><br/>
            <TextField type="text" value={this.state.url}  hintText="URL de la vidéo avec (lien embed)"  /><br/>
            <input type="submit" value="Submit" />
        </form>

          

       
            
            </Dialog>
        </div>
      );
    }
  }

//   <input
//   type="text" 
//   value={this.state.input}
//   placeholder="URL de la vidéo"/>