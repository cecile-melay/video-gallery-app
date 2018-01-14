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
app.get('/api/restaurants', function(req, res) { 
	// Si prÃ©sent on prend la valeur du param, sinon 1
    let page = parseInt(req.query.page || 1);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 10);

 	mongoDBModule.findRestaurants(page, pagesize, function(data) {
 		var objdData = {
 			msg:"Restaurant recherchés avec succès",
 			data: data
		 }
		 console.log(data);
 		res.send(JSON.stringify(objdData)); 
 	}); 
}); 

// RÃ©cupÃ©ration d'un seul restaurant par son id
app.get('/api/restaurants/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.findRestaurantById(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
 
});

// Creation d'un restaurant par envoi d'un formulaire
// On fera l'insert par un POST, c'est le standard REST
app.post('/api/restaurants', multerData.fields([]), function(req, res) {
	// On supposera qu'on ajoutera un restaurant en 
	// donnant son nom et sa cuisine. On va donc 
	// recuperer les donnÃ©es du formulaire d'envoi
	// les params sont dans req.body mÃªme si le formulaire
	// est envoyÃ© en multipart

 	mongoDBModule.createRestaurant(req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Modification d'un restaurant, on fera l'update par
// une requÃªte http PUT, c'est le standard REST
app.put('/api/restaurants/:id', multerData.fields([]), function(req, res) {
	var id = req.params.id;

 	mongoDBModule.updateRestaurant(id, req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Suppression d'un restaurant
// On fera la suppression par une requÃªte http DELETE
// c'est le standard REST
app.delete('/api/restaurants/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.deleteRestaurant(id, function(data) {
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
 	mongoDBModule.countRestaurants(function(data) {
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
    let pagesize = parseInt(req.query.pagesize || 10);
    let nom = req.query.nom;

	if(nom) {
    	// find by name
	 	mongoDBModule.findRestaurantsByName(nom, page, pagesize, function(data) {
	 		var objdData = {
	 			msg:"restaurant recherchés par nom avec succès",
	 			data: data
	 		}
	 		res.send(JSON.stringify(objdData)); 
		 }); 
		 console.log(data);
    } else {
    	// find normal
	 	mongoDBModule.findRestaurants(page, pagesize, function(data) {
	 		var objdData = {
	 			msg:"restaurant recherchés avec succès",
	 			data: data
	 		}
	 		res.send(JSON.stringify(objdData)); 
	 	}); 

    }
});


