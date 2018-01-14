import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FlatButton from 'material-ui/FlatButton';
import DialogExampleSimple from'./video-dialog';


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




const tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
    featured: true,
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Morning',
    author: 'fancycrave1',
    featured: true,
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

// Composant fonctionnel
function Hobby(props) {
  const liStyle = {
    backgroundColor: props.index % 2 === 0 ? 'lightpink' : 'red'
  };
    return(
      <li style={liStyle} onClick={() => props.HobbyWasClicked(props.hobbyName)}>
        {props.hobbyName}
      </li>
    )
}

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

  handleOpen = () => {
    this._child.handleOpen();
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

   // 

    let list = this.state.hobbies.map(
      (el, index) => {
        const liStyle = {
          backgroundColor: index % 2 === 0 ? 'lightpink' : 'red'
        };
        return <li key={el+index} style={liStyle} index={index} onClick={() => this.removeHobby(el)}>{el}</li>
      }
    );

    

    console.log(this.state);

    let listComponents = this.state.hobbies.map(
      (el, index) => {
      
        return <Hobby key={index} 
        index={index} 
        HobbyWasClicked={this.removeHobby.bind(this)}
        hobbyName={el}/>
      }
    );


    let hobbyDeletedParagraph;
    if(this.state.hobbyWasDeleted) {
      hobbyDeletedParagraph = <p>Hobby Deleted !</p>
    }

    const hobbyCounterStyle = {
      color: (this.state.hobbies.length <= 3) ? "green" : "red"
    }

    const hobbyCounterClass = (this.state.hobbies.length > 3) ? "redBorder" : ""
    return (
      <MuiThemeProvider>
     
   
      <div className="App"> 

      <DialogExampleSimple ref={(child) => { this._child = child; }}></DialogExampleSimple>

        <h3>Galerie vidéo MBDS</h3>
        <input onChange={this.inputChanged.bind(this)} 
              type="text" 
              value={this.state.input}
              placeholder="URL de la vidéo"/>
          <button onClick={this.addHobby.bind(this)}>Ajouter une vidéo</button>
          {hobbyDeletedParagraph}
          <p style={hobbyCounterStyle} className={hobbyCounterClass}> Hobbies : {this.state.hobbies.length}</p>

          
          <p>Avec composant séparé</p>


          <div style={styles.root}>
    <GridList
      cols={4}
      cellHeight={200}
      padding={1}
      style={styles.gridList}
    >
      {this.state.hobbies.map((el, index) => (

        <GridTile
          key={el}
          title={el}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleStyle={styles.titleStyle}
          actionPosition="left"
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={1}
          rows={1}
          onClick={this.handleOpen}
        >
        
          <img src={"images/grid-list/honey-823614_640.jpg"} />
          
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

export default App;
