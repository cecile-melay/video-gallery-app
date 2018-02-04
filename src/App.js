import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ContentLink from 'material-ui/svg-icons/content/link';

//Custom react component
import VideoDialog from'./video-dialog.component';
import AddVideoDialog from'./add-video-dialog.component'; 



class App extends Component {

  constructor(props) {
    super(props);

    this.loadData();
    this.loadData = this.loadData.bind(this);
    
    this.state = {
      videos : [],
      open: false,
      pageState : 0,
      selected: 1,
      input: "",
      videoWasDeleted: false,
      videosData: [],
      videosImg: []
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
    let url = "http://localhost:8080/api/videos";  
    //document.getElementById("btnPrevious").disabled = true;      
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      let data = [];
      let videosImg = [] 
      for (var i=0; i < responseJson.data.length; i++) {
        // for each video get info for youtube API
         data.push(responseJson.data[i]);
         data[i].videoImg = responseJson.videosInfos[i].thumbnailUrl
         data[i].titleVideo = responseJson.videosInfos[i].title
         data[i].owner = responseJson.videosInfos[i].owner
         data[i].embedURL = responseJson.videosInfos[i].embedURL
         data[i].genre = responseJson.videosInfos[i].genre
         data[i].description = responseJson.videosInfos[i].description
         data[i].datePublished = responseJson.videosInfos[i].datePublished
         data[i].duration = responseJson.videosInfos[i].duration
         data[i].views = responseJson.videosInfos[i].views

         
      }
      this.setState({
          videos:data,
          videosImg:videosImg,
          input : ""
      });
      console.log(data);
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
  addvideo() {
    //alert("addvideo: " + this.state.input);
    const oldvideos = this.state.videos;
    this.setState({
      videos: oldvideos.concat(this.state.input),
      input : ""
    });
  }

  /**
   * TODO
   * @param {*} video 
   */
  removevideo(video) {
    const oldvideos = this.state.videos;
    const position = oldvideos.indexOf(video);
    this.setState({
      videos: oldvideos.filter(
        (el, index) => {
          return (index !== position)
        }
      ),
      videoWasDeleted : true
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
              videos:data,
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
          videos:data,
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
    //TODO Delete video action
    let list = this.state.videos.map(
      (el, index) => {
        const liStyle = {
          backgroundColor: index % 2 === 0 ? 'lightpink' : 'red'
        };
        return <li key={el+index} style={liStyle} index={index} onClick={() => this.removevideo(el)}>{el}</li>
      }
    );
    let videoDeletedParagraph;
    if(this.state.videoWasDeleted) {
      videoDeletedParagraph = <p>video Deleted !</p>
    }

    //Example of dynamic style
    const videoCounterStyle = {
      color: (this.state.videos.length <= 3) ? "green" : "red"
    }
    const videoCounterClass = (this.state.videos.length > 3) ? "redBorder" : ""

    let displayVideos = <p>Chargement, veuillez patientez quelques secondes pendant le chargement des vidéos...</p>;
    if (this.state.videos.length > 0) {
      displayVideos = <p style={videoCounterStyle} className={videoCounterClass}>{this.state.videos.length} vidéos</p>;
    }
    
    return (
      <MuiThemeProvider >

        <div className="App">

        <AppBar
          title="Galerie vidéo MBDS"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onClick={this.handleToggle}
        /> 

        <div className="content">       
          <RaisedButton style={styles.addvideo} label="Ajouter une vidéo" onClick={this.openAddVideoDialogForm} />
          {videoDeletedParagraph}
          {displayVideos}
          <div style={styles.root}>
            <GridList
              cols={4}
              cellHeight={200}
              padding={1}
              style={styles.gridList}
            >
              {this.state.videos.map((el, index) => (
              <GridTile
                key={el._id}
                title={el.titleVideo}
                actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
                titleStyle={styles.titleStyle}
                actionPosition="left"
                titlePosition="top"
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                cols={1}
                rows={1}             
              >
              <img onClick={(e) => this.openVideoDialog(el, e)} src={el.videoImg} />
              </GridTile> 
              ))}
            </GridList>
          </div>
               
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
      <div className="content">
        <h1>Bienvenue</h1>
        <h3>sur l'appli de présentation du MBDS en vidéo !</h3>
      </div>
      <a href="http://miageprojet2.unice.fr/Intranet_Michel_Buffa" target="_blank" ><MenuItem rightIcon={<ContentLink /> }>Consignes du projet</MenuItem></a>
      <a href="https://github.com/cecile-melay/video-gallery-app" target="_blank" ><MenuItem rightIcon={<ContentLink /> }>Projet Github</MenuItem></a>
      </Drawer>

    </MuiThemeProvider>);
  }

 /*//TODO Pagination 
 <RaisedButton label="Précédent" primary={true}  onClick={this.prevPage.bind(this)} />
  <RaisedButton style={styles.marginLeft} label="Suivant" primary={true}  onClick={this.nextPage.bind(this)} /> */  

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
    marginBottom: 30,
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
