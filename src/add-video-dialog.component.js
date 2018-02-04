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
      url:'https://www.youtube.com/watch?v=iu3qoIsGzUM',
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
        open: true});
    };
  
    /**
     * Close Dialog
     */
    handleClose = () => {
      this.setState({open: false});
    };

    handleChangeUrl = (event) => {
      this.setState({
        url: event.target.value,
      });
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
                <TextField  style={styles.textfield} type="text" value={this.state.url} onChange={this.handleChangeUrl} hintText="URL de la vidéo avec (lien embed)"  /><br/>
            </form>            
          </Dialog>
        </div>
      );
    }
  }

  const styles = {
    textfield: {
      width:'100%',
    }
  }

//   <input
//   type="text" 
//   value={this.state.input}
//   placeholder="URL de la vidéo"/>