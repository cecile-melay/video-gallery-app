const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const server   = require('http').Server(app);
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

const mongoDBModule = require('./app_modules/crud-mongo');

// Pour les formulaires standards
const bodyParser = require('body-parser');
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

// Cette ligne indique le rÃ©pertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(__dirname + '/public'));
// ParamÃ¨tres standards du modyle bodyParser
// qui sert Ã  rÃ©cupÃ©rer des paramÃ¨tres reÃ§us
// par ex, par l'envoi d'un formulaire "standard"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

// Lance le serveur avec express
server.listen(port);

console.log("Serveur lancé sur le port : " + port);

//------------------
// ROUTES
//------------------
// Utile pour indiquer la home page, dans le cas
// ou il ne s'agit pas de public/index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Ici des routes en :
// http GET (pour rÃ©cupÃ©rer des donnÃ©es)
// http POST : pour insÃ©rer des donnÃ©es
// http PUT pour modifier des donnÃ©es
// http DELETE pour supprimer des donnÃ©es

//----------------------------------------------
// Ces routes forment l'API de l'application !!
//----------------------------------------------

// Test de la connexion Ã  la base
app.get('/api/connection', function(req, res) {
	// Pour le moment on simule, mais aprÃ¨s on devra
	// rÃ©ellement se connecte Ã  la base de donnÃ©es
	// et renvoyer une valeur pour dire si tout est ok
   mongoDBModule.connexionMongo(function(err, db) {
   	let reponse;

   	if(err) {
   		console.log("erreur connexion");
   		reponse = {
   			msg: "erreur de connexion err=" + err
   		}
   	} else {
   		reponse = {
   			msg: "connexion Ã©tablie"
   		}
   	}
   	res.send(JSON.stringify(reponse));

   });
});

// On va rÃ©cupÃ©rer des restaurants par un GET (standard REST) 
// cette fonction d'API peut accepter des paramÃ¨tres
// pagesize = nombre de restaurants par page
// page = no de la page
// Oui, on va faire de la pagination, pour afficher
// par exemple les restaurants 10 par 10
app.get('/api/videos', function(req, res) { 
	// Si prÃ©sent on prend la valeur du param, sinon 1
    let page = parseInt(req.query.page || 1);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 8);

 	mongoDBModule.findVideos(page, pagesize, function(data) {    
    callAPIYoutube(data , function(videosInfos) {
      var objdData = {
        msg:"Restaurant recherchés avec succès",
        data: data,
        videosInfos : videosInfos
     }
      res.send(JSON.stringify(objdData)); 
    });
 		
 	}); 
}); 

var cpt = 0;
var videosInfo = [];

callAPIYoutube = function(dataVideo, callback) { 
  // Load client secrets from a local file.
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      callback(err);
    } else {
      // Authorize a client with the loaded credentials, then call the YouTube API.
      //authorize(JSON.parse(content), getChannel);
      if (cpt < dataVideo.length) {      
      var idVideo = dataVideo[cpt].url.split('/')[4];
      fetchVideoInfo(idVideo).then(function (videoInfo) {
        videosInfo.push(videoInfo);
        callAPIYoutube(dataVideo, callback);
      });
      cpt++;
      } else {
        callback(videosInfo);
      }
    }
  });
}

// RÃ©cupÃ©ration d'un seul restaurant par son id
app.get('/api/video/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.findRestaurantById(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
 
});

// Creation d'un restaurant par envoi d'un formulaire
// On fera l'insert par un POST, c'est le standard REST
app.post('/api/addvideo', multerData.fields([]), function(req, res) {
	// On supposera qu'on ajoutera un restaurant en 
	// donnant son nom et sa cuisine. On va donc 
	// recuperer les donnÃ©es du formulaire d'envoi
	// les params sont dans req.body mÃªme si le formulaire
	// est envoyÃ© en multipart

 	mongoDBModule.createVideo(req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Modification d'un restaurant, on fera l'update par
// une requÃªte http PUT, c'est le standard REST
app.put('/api/updatevideo/:id', multerData.fields([]), function(req, res) {
	var id = req.params.id;
	console.log('hi');
 	mongoDBModule.updateVideo(id, req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Suppression d'un restaurant
// On fera la suppression par une requÃªte http DELETE
// c'est le standard REST
app.delete('/api/deletevideo/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.deleteVideo(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// ICI c'est autorisé par la norme REST car
// "count" est un mot réservé, on ne risque pas de
// le prendre pour une TABLE ou une collection
// cf la partie "reserved words" de
// https://blog.octo.com/designer-une-api-rest/
app.get('/api/restaurantscount', function(req, res) { 
	// on renvoie le nombre de restaurants
 	mongoDBModule.countVideos(function(data) {
 		var objdData = {
 			msg:"Count effectué avec succès",
 			data: data
 		}
 		res.send(JSON.stringify(objdData)); 
 	});     	
});

// On va récupérer des restaurants par un GET (standard REST) 
// cette fonction d'API peut accepter des paramètres
// pagesize = nombre de restaurants par page
// page = no de la page
// Oui, on va faire de la pagination, pour afficher
// par exemple les restaurants 10 par 10
app.get('/api/restaurants', function(req, res) { 
	// Si présent on prend la valeur du param, sinon 1
    let page = parseInt(req.query.page || 0);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 8);
    let nom = req.query.nom;

	if(nom) {
    	// find by name
	 	mongoDBModule.findVideosByName(nom, page, pagesize, function(data) {
	 		var objdData = {
	 			msg:"restaurant recherchés par nom avec succès",
	 			data: data
	 		}
	 		res.send(JSON.stringify(objdData)); 
		 }); 
		 console.log(data);
    } else {
    	// find normal
	 	mongoDBModule.findVideos(page, pagesize, function(data) {
	 		var objdData = {
	 			msg:"restaurant recherchés avec succès",
	 			data: data
	 		}
	 		res.send(JSON.stringify(objdData)); 
	 	}); 

    }
});











var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fetchVideoInfo = require('youtube-info');
var async = require('async')

// Install the npm package by this way
// npm install googleapis --save
// npm install google-auth-library@0.* --save

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';





/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getChannel(auth) {
  var service = google.youtube('v3');
  service.channels.list({
    auth: auth,
    part: 'snippet,contentDetails,statistics',
    //forUsername: 'Cécile Melay'
    id : "UCPFdgZNuD2vAdlvQ2bHJ8pg"
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var channels = response.items;
    if (channels.length == 0) {
      console.log('No channel found.');
    } else {
      console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                  'it has %s views.',
                  channels[0].id,
                  channels[0].snippet.title,
                  channels[0].statistics.viewCount);
    }
  });
}



function getVideoInfos(idVideo, callback) { 
    fetchVideoInfo(idVideo, function (err, videoInfo) {
    if (err) throw new Error(err);
    //console.log(videoInfo);
    //console.log(videoInfo.genre)
    callback(videoInfo.genre)
  });
}

/*fetchVideoInfo('cW7yK0fCl4Y', function (err, videoInfo) {
  if (err) throw new Error(err);
  console.log(videoInfo);
});
*/

function videosGetRating(auth, requestData) {
  var service = google.youtube('v3');
  var parameters = removeEmptyParameters(requestData['params']);
  parameters['auth'] = auth;
  service.videos.getRating(parameters, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log(response);
  });
}



                 