import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class UpdateVideoDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  //Declare global variable
    state = {
      open: false,
      video: [],
      details: [],
      name:'',
      user:'',
      url:'',
      id:0,
    };

    /**
     * Open Dialog
     */
    handleOpen = (el) => {
      console.log(el);
      this.setState({
        
      })
      this.setState({
        id : el._id,
        video : el,
        name : el.name,
        user : el.user,
        url : el.url,
        
        //get data of video with deep 2 for access in the render method
        details : el.details,
        description : el.details.description,
        
        open: true});
    };
  
    /**
     * Close Dialog
     */
    handleClose = () => {
      this.setState({open: false});
    };

    /**
     * Update video by its id 
     * send data to the serverCrudWithMongo.js
     */
    handleUpdate = () => {
      console.log(this.state.name);
      fetch('http://localhost:8080/api/updatevideo/'+this.state.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',    
        body: JSON.stringify({
          name: this.state.name,
          details: {description:this.state.description},
          user:this.state.user,
          url: this.state.url,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.handleClose();
        this.props.handleClose(true);
      })
    }  

    /**
     * Delete video by its id 
     */
    handleDelete = () => {
      console.log(this.state.name);
      fetch('http://localhost:8080/api/deletevideo/'+this.state.id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',    
        body: JSON.stringify({
          name: this.state.name,
          details: {description:this.state.description},
          user:this.state.user,
          url: this.state.url,
        })
  
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.handleClose();
        this.props.handleClose(true);
      })
      
    }  

  /**
   * Handle the double data binding
   */
  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  handleChangeUser = (event) => {
    this.setState({
      user: event.target.value,
    });
  };
  handleChangeUrl = (event) => {
    this.setState({
      url: event.target.value,
    });
  };
  
    render() {
      const actions = [ 
        <FlatButton
        label="Supprimer la vidéo"
        primary={true}
        onClick={this.handleDelete}
      />,     
        <FlatButton
          label="Annuler"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
        label="Valider"
        primary={true}
        onClick={this.handleUpdate}
      />,
      ];
  
      return (
        <div>         
          <Dialog
            title="Modifier la vidéo"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}        
          >
            <form onSubmit={this.handleSubmit}>
                <TextField id="text-field-controlled-name" value={this.state.name} onChange={this.handleChangeName}/>
                <TextField id="text-field-controlled-description" value={this.state.description} onChange={this.handleChangeDescription} /><br/>
                <TextField id="text-field-controlled-user" value={this.state.user} onChange={this.handleChangeUser}/><br/>
                <TextField id="text-field-controlled-url" value={this.state.url} onChange={this.handleChangeUrl} /><br/>
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