import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FlatButton from 'material-ui/FlatButton';
import DialogExampleSimple from'./video-dialog';

class App extends Component {

  constructor(props) {
    super(props);

    this.loadData();
    
    this.state = {
      hobbies : [],
      pageState : 0,
      selected: 1,
      input: "",
      hobbyWasDeleted: false
    };
  }

  handleOpen = (el) => {
    this._child.handleOpen(el);
  };

  loadData() {
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

  addHobby() {
    //alert("addHobby: " + this.state.input);
    const oldHobbies = this.state.hobbies;
    this.setState({
      hobbies: oldHobbies.concat(this.state.input),
      input : ""
    });
  }

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

  inputChanged(event) {
    let value = event.target.value;
    this.setState({
      input: value
    })
  }

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

  render() {
    console.log(this.state);

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
    const customStyle = {
      display:"none !important"
    }
    
    return (
      <MuiThemeProvider>
      <div className="App"> 

      
        <h3>Galerie vidéo MBDS</h3>
        <input onChange={this.inputChanged.bind(this)} 
              type="text" 
              value={this.state.input}
              placeholder="URL de la vidéo"/>
          <button onClick={this.addHobby.bind(this)}>Ajouter une vidéo</button>
          {hobbyDeletedParagraph}
          <p style={hobbyCounterStyle} className={hobbyCounterClass}> Hobbies : {this.state.hobbies.length}</p>

          
          <p>Avec composant séparé</p>

        
        <DialogExampleSimple style={customStyle} ref={(child) => { this._child = child; }}></DialogExampleSimple>
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
     
          <img onClick={(e) => this.handleOpen(el, e)} src={"images/grid-list/honey-823614_640.jpg"} />
          
        </GridTile>
        
      ))}
    </GridList>
    </div>        
          <button onClick={this.prevPage.bind(this)}>Précédent</button>
          <button onClick={this.nextPage.bind(this)}>Suivant</button>
       </div>
       </MuiThemeProvider>
    );
  }
}

//Grid List Style
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
};

export default App;
