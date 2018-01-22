import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
// import Header from 'material-ui/components/header'; 
// import NewPost from 'material-ui/components/new_post';

/**
 * Custom react component
 */
import VideoDialog from'./video-dialog.component';
import AddVideoDialog from'./add-video-dialog.component'; 

class App extends Component {

  constructor(props) {
    super(props);

    this.loadData();
    this.loadData = this.loadData.bind(this);
    
    this.state = {
      hobbies : [],
      open: false,
      pageState : 0,
      selected: 1,
      input: "",
      hobbyWasDeleted: false
    };
  }

  /**
   * Toggle the top menu side bar
   */
  handleToggle = () => this.setState({open: !this.state.open});

  /**
   * Call the child component method to open the dialog
   */
  openVideoDialog = (el) => {
    this._videoDialog.handleOpen(el);
  };

   /**
   * Call the child component method to open the dialog
   */
  openAddVideoDialogForm = (el) => {
    this._addVideoDialog.handleOpen(el);
  };

   /**
   * Get data from the ServerCrudWithMongo
   */
  loadData() {
    console.log('hey');
    let url = "http://localhost:8080/api/restaurants";  
    //document.getElementById("btnPrevious").disabled = true;      
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      let data = [];
      console.log(responseJson);
      for (var i=0; i < responseJson.data.length; i++) {
         data.push(responseJson.data[i]);
      }
      this.setState({
          hobbies:data,
          input : ""
      });
    })
    .catch((error) => {
      console.error(error);
    });      
  }

  test1() {
    console.log('test');
  }

  /**
   * TODO
   */
  addHobby() {
    //alert("addHobby: " + this.state.input);
    const oldHobbies = this.state.hobbies;
    this.setState({
      hobbies: oldHobbies.concat(this.state.input),
      input : ""
    });
  }

  /**
   * TODO
   * @param {*} hobby 
   */
  removeHobby(hobby) {
    const oldHobbies = this.state.hobbies;
    const position = oldHobbies.indexOf(hobby);
    this.setState({
      hobbies: oldHobbies.filter(
        (el, index) => {
          return (index !== position)
        }
      ),
      hobbyWasDeleted : true
     } );
  }

  /**
   * TODO
   * @param {*} event 
   */
  inputChanged(event) {
    let value = event.target.value;
    this.setState({
      input: value
    })
  }

  /**
   * TODO
   */
  prevPage() {
    console.log(this.state.pageState);
    //app7.updateButtons();  
    if (this.state.pageState > 1) {             
        this.state.pageState--;
        this.state.selected = this.state.pageState;
        let url = "http://localhost:8080/api/restaurants?page="+this.state.pageState;  
        //document.getElementById("btnPrevious").disabled = true;      
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          let data = [];
          for (var i=0; i < responseJson.data.length; i++) {
             data.push(responseJson.data[i].name);
          }
          this.setState({
              hobbies:data,
              input : ""
          });
        })
        .catch((error) => {
          console.error(error);
        });    
    }
  }

   /**
   * TODO
   */
  nextPage() {
    this.state.pageState++;
    let url = "http://localhost:8080/api/restaurants?page="+this.state.pageState;  
    //document.getElementById("btnPrevious").disabled = true;      
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      let data = [];
      for (var i=0; i < responseJson.data.length; i++) {
         data.push(responseJson.data[i].name);
      }
      this.setState({
          hobbies:data,
          input : ""
      });
    })
    .catch((error) => {
      console.error(error);
    });      
  }

   /**
   * Display
   */
  render() {
    //TODO Delete hobby action
    let list = this.state.hobbies.map(
      (el, index) => {
        const liStyle = {
          backgroundColor: index % 2 === 0 ? 'lightpink' : 'red'
        };
        return <li key={el+index} style={liStyle} index={index} onClick={() => this.removeHobby(el)}>{el}</li>
      }
    );
    let hobbyDeletedParagraph;
    if(this.state.hobbyWasDeleted) {
      hobbyDeletedParagraph = <p>Hobby Deleted !</p>
    }

    //Example of dynamic style
    const hobbyCounterStyle = {
      color: (this.state.hobbies.length <= 3) ? "green" : "red"
    }
    const hobbyCounterClass = (this.state.hobbies.length > 3) ? "redBorder" : ""
    
    return (
      <MuiThemeProvider >

        <div className="App">

        <AppBar
          title="Galerie vidéo MBDS"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onClick={this.handleToggle}
        /> 

        <div class="content">       
          <RaisedButton style={styles.addvideo} label="Ajouter une vidéo" onClick={this.openAddVideoDialogForm} />
          {hobbyDeletedParagraph}
          <p style={hobbyCounterStyle} className={hobbyCounterClass}>{this.state.hobbies.length} vidéos</p>
          <div style={styles.root}>
            <GridList
              cols={4}
              cellHeight={200}
              padding={1}
              style={styles.gridList}
            >
              {this.state.hobbies.map((el, index) => (
              <GridTile
                key={el.name}
                title={el.name}
                actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
                titleStyle={styles.titleStyle}
                actionPosition="left"
                titlePosition="top"
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                cols={1}
                rows={1}             
              >
              <img onClick={(e) => this.openVideoDialog(el, e)} src={"images/grid-list/youtube_blog.png"} />
              </GridTile> 
              ))}
            </GridList>
          </div>
          <RaisedButton label="Précédent" primary={true}  onClick={this.prevPage.bind(this)} />
          <RaisedButton style={styles.marginLeft} label="Suivant" primary={true}  onClick={this.nextPage.bind(this)} />         
        </div>
      </div>

      <VideoDialog loadData={this.loadData} ref={(videoDialog) => { this._videoDialog = videoDialog; }}></VideoDialog>
      <AddVideoDialog loadData={this.loadData} ref={(addVideoDialog) => { this._addVideoDialog = addVideoDialog; }}></AddVideoDialog>
      
      <Drawer
      docked={false}
      width={300}
      open={this.state.open}
      onRequestChange={(open) => this.setState({open})}
      >
      <div class="content">
        <h1>Bienvenue</h1>
        <h3>sur l'appli de présentation du MBDS en vidéo !</h3>
      </div>
        <MenuItem onClick={this.handleClose}>Consignes du projet</MenuItem>
        <MenuItem onClick={this.handleClose}  >Etat du Projet</MenuItem>
        <MenuItem onClick={this.handleClose} rightIcon={<ContentLink /> }>Projet Github</MenuItem>
        <MenuItem onClick={this.handleClose} rightIcon={<ContentLink /> } >Master 2 MBDS</MenuItem>
        <MenuItem onClick={this.handleClose} rightIcon={<ContentLink /> } >Master 2 MIAGE</MenuItem>
      </Drawer>

    </MuiThemeProvider>);
  }



//End of App
}

/**
 * App style css
 */
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 950,
    height: 450,
    overflowY: 'auto',
  },
  hide : {
    display: 'none',
  },
  addvideo:{
    margin: 'auto',
    width: '200px',
    display:'block',
    marginTop:'50px',
  },
  marginLeft:{
    marginLeft:'10px',
  }
};

export default App;
