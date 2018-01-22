import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class AddVideoDialog extends React.Component {

  constructor(props) {
    super(props);
    
     //Declare global variable
    this.state = {
      open: false,
      video: [],
      details: {description:''},
      name:'Flume - Never Be Like You feat. Kai',
      user:'Cécile',
      url:'https://www.youtube.com/embed/Ly7uj0JwgKg',
      description:'',
    };
  }


 
    

    /**
     * Open Dialog
     */
    handleOpen = (el) => {   
      this.setState({
        video : el,
        //get data of video with deep 2 for access in the render method
        details : el.details,
        open: true});
    };
  
    /**
     * Close Dialog
     */
    handleClose = () => {
      this.setState({open: false});
    };

    /**
     * Create new video 
     * send data to the serverCrudWithMongo.js
     */
    handleSubmit = () => {
      fetch('http://localhost:8080/api/addvideo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          details: {description:this.state.description},
          user:this.state.user,
          url: this.state.url,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.loadData();
        this.handleClose();
      })  
    }  
  
    render() {
      const actions = [      
        <FlatButton
          label="Valider"
          primary={true}
          onClick={this.handleSubmit}
        />,
        <FlatButton
        label="Retour"
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
                <TextField type="text" defaultValue={this.state.name}  hintText="Nom"  /><br/>
                <TextField type="text" defaultValue={this.state.description}  hintText="Description" /><br/>
                <TextField type="text" defaultValue={this.state.user}  hintText="Votre nom ou pseudo" /><br/>
                <TextField type="text" defaultValue={this.state.url}  hintText="URL de la vidéo avec (lien embed)"  /><br/>
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