var page = 0;
var url;
var urlCount;

window.onload = function()
{
    init();
};

function init() {
     url = "/api/restaurants";
     document.getElementById("btnPrevious").disabled = true;   
        fetch(url)
            .then(function(responseJSON) {
                responseJSON.json()
                .then(function(res) {
                    // Maintenant res est un vrai objet JavaScript
                    afficheReponseGET(res);
                });
            })
            .catch(function (err) {
                console.log(err);
        });
        urlCont = "/api/restaurantscount";  
        fetch(urlCont)
            .then(function(responseJSON) {
                responseJSON.json()
                .then(function(res) {
                    // Maintenant res est un vrai objet JavaScript
                    console.log(res.data/10);
                    console.log(res.data);
                    
                });
            })
            .catch(function (err) {
                console.log(err);
        });

       

}

// REQUETES GET
function getRequestDisplayData() {
	let url = "/api/restaurants";

	fetch(url)
		.then(function(responseJSON) {
        	responseJSON.json()
        	.then(function(res) {
        		// Maintenant res est un vrai objet JavaScript
        		afficheReponseGET(res);
        	});
    	})
    	.catch(function (err) {
        	console.log(err);
    });
}

function DisplayNextData(){
    page++;
    let url = "/api/restaurants?page="+page;
    document.getElementById("btnPrevious").disabled = false;
    
        fetch(url)
            .then(function(responseJSON) {
                responseJSON.json()
                .then(function(res) {
                    // Maintenant res est un vrai objet JavaScript
                    afficheReponseGET(res);
                });
            })
            .catch(function (err) {
                console.log(err);
        });
}

function DisplayPreviousData(){
    page--;
    let url = "/api/restaurants?page="+page;
    
        fetch(url)
            .then(function(responseJSON) {
                responseJSON.json()
                .then(function(res) {
                    // Maintenant res est un vrai objet JavaScript
                    afficheReponseGET(res);
                });
            })
            .catch(function (err) {
                console.log(err);
        });
    
}

//-------------------------------
// Affichage d'une rÃ©ponse JSON
function afficheReponseGET(reponse) {
    let div = document.querySelector("#reponseGET");
    div.innerHTML = reponse.msg;

    // Dans reponse.data j'ai les restaurants
    afficheRestaurantsEnTable(reponse.data);
}

//------------ ici fonction pour creer tableau
function afficheRestaurantsEnTable(restaurants) {
    console.log("creer tableau");

    // On cree un tableau
    let table = document.createElement("table");

    // Je cree une ligne
    for(var i=0; i < restaurants.length; i++) {
        let ligne = table.insertRow();
        ligne.id = "restaurant" + i;

        let restaurant = restaurants[i];
        let nom = restaurant.name;
        let cuisine = restaurant.cuisine;

        let celluleNom = ligne.insertCell();
        celluleNom.innerHTML = nom;
        celluleNom.id = "restaurant" + i + "Nom" ;

        let celluleCuisine = ligne.insertCell();
        celluleCuisine.innerHTML = cuisine;
        celluleCuisine.id = "restaurant" + i + "Cuisine" ;

        let celluleRemove = ligne.insertCell();
        celluleRemove.innerHTML = '<button id=' + restaurant._id + ' onclick="supprimerRestaurant(event);">Supprimer</button>';

        let celluleModifier = ligne.insertCell();
        celluleModifier.innerHTML = '<button id=' + restaurant._id + ' onclick="modifierRestaurant(' + i + ');">Modifier</button>';

        /*
        ligne.innerHTML = "<td>" + nom + "</td><td>"    
                            + cuisine + "</td>"; 
                            */
    }

    let divTable = document.querySelector("#reponseGETenTableau");
    divTable.innerHTML = "";

    // on ajoute le tableau au div
    divTable.appendChild(table);
}

