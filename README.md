# Video gallery app

## Description

L'application est développé avec le framework ReactJS.

Nous avons choisi ce framework car il se situe parmis les plus rapides -à la différence de Angular qui est plutôt lent lors du premier chargement-.

Plus compliqué que VueJS et légèrement plus lent -de très peu-, nous avons également choisi ReactJS car ce framework permet un déploiement hybrid sur iOs, Android et WindowsPhone. 

L'application utilise l'Api ServerCrudWithMongo vue en cours légèrement modifiée.

## Etat des lieux

### Description du Crud

Le Crud réalisé permet de :

- Create : il est possible d'ajouter une vidéo via un formulaire dans un dialog

- Read : l'application affiche 4 vidéos. Il est possible de consulté les autres vidéos en cliquant sur les boutons suivant ou précédent. Pour lire les vidéos, il faut en cliquer sur l'image. Un dialog s'ouvre et affiche la vidéo depuis la balise HTML <iframe>. 

- Update : il est possible de modifier l'url d'une vidéo en cliquant sur le bouton modifier depuis le premier dialog qui effecue le read qui ouvre un autre dialog qui contient une formulaire de modification de vidéo

- Delete : il est possible de supprimer une vidéo et ses informations en cliquant sur le bouton modifier depuis le premier dialog qui effecue le read puis de cliquer sur le bouton suprimer

### Description de l'utilisation de l'API Youtube
L'application utilise les modules nodeJS google-auth-library, googleapis et youtubeinfo pour authentifier l'accès à l'API via le fichier client_secret.json et obtenir le titre, la description (et autres) des vidéos en fonction de leurs ID à l'aide d'une fonction récursive. Ces informations sont retournées au ReactJS qui les affiche dans le composant principal App puis les envoies également dans ses composants enfants. 

### Perspective d'amélioration
Les points d'amélioration que nous aurions pu réaliser :
- Trouver un moyen de diminuer le temps de chargement des appels vers l'api Youtube,
- Ajouter la pagination.

# Sujet

## Mini projet à rendre avant le 31 Janvier (MBDS)
Vous devrez réaliser, avec un des trois frameworks vus en cours (VueJS, React, Angular 4/5), une application "galerie vidéo" présentant des vidéos YouTube faites par les élèves du MBDS, 30 secondes maximum, présentant le MBDS en entier ou juste une de ses facettes.

## Cahier des charges:

### Description générale

L'application est une galerie de vidéos. On suppose que les vidéos ont été postées sur YouTube, et qu'elles sont accessibles via leur URL. Je suggère que la promo fasse une chaine MBDS dans laquelle l'ensemble des vidéos sera posté.
 
L'application que vous allez développer permettra d'ajouter/modifier/supprimer/afficher des vidéos sous la forme d'une galerie. 
 
### Visualisation de la gallerie / lecture des vidéos

Une fois arrivé sur la page de départ, on voit une liste de vidéos (par défaut elles ne sont pas en lecture, on ne voit que le lecteur vidéo en mode "statique", on peut imaginer aussi afficher une image par vidéo, si on clique sur l'image ça lance la vidéo), sous la vidéo on voit sa légende (une ligne, par exemple le nom de la personne sur la vidéo ou le titre de la vidéo).
 
Si on clique sur une vidéo, ça joue la vidéo, et on peut voir sa description. On utilisera simplement dans le template d'un composant que vous crééerez pour jouer la vidéo, le code HTML (une iframe) proposé par YouTube pour insérer une vidéo dans une page Web.
 
A priori on n'a pas besoin de pagination, on affichera toutes les imagettes des vidéos sur une simple page.
 
### Facultatif  : faire de la pagination et permettre à l'application de gérer un plus grand nombre de vidéos.
 
Facultatif : Possibilité de noter la vidéo avec des étoiles (1 à 5 étoiles), dans un premier temps on ne vérifiera pas qu'un utilisateur puisse voter plusieurs fois. On essaiera de réfléchir à un système essayant d'interdire les votes multiples, sans que l'utilisateur ait besoin de s'authentifier.
 
### Ajout d'une vidéo

Un bouton ou une entrée de menu permettra d'ajouter une nouvelle vidéo. On demandera l'URL de la vidéo YouTube, une description de quelques lignes, et une légende pour afficher sous la vidéo. On vérifiera que la vidéo n'a pas déjà été ajoutée. On vérifiera aussi que les champs description et légende ne sont pas vides avant de publier la vidéo.
 
### Facultatif : utiliser l'API de YouTube pour récupérer la description de la vidéo et la légende (le titre de la vidéo) directement sur YouTube. 
On supposera dans un premier temps que la clé d'API est codée "en dur", vous pourrez, si vous avez le temps et si vous êtes à l'aise, prévoir un menu "paramètres" dans lequel vous pourrez coller la clé d'API qui sera utilisée par l'application.
 
### Modification d'une vidéo

On pourra modifier la description ou la légende d'une vidéo après publication. Ce ne sera pas modifié sur YouTube, ou bien (facultatif) optionellement (case à cocher ?)
 
### Suppression d'une vidéo

On pourra ajouter un bouton ou une croix pour supprimer une vidéo. La vidéo ne sera supprimée que de votre base de données, pas sur YouTube.

## BACK END :

Vous utiliserez soit MongoDB et NodeJS/Express comme dans les TPs, soit FireBase.
Attention, si vous faites un projet "serveur" avec node + express + mongo, et un autre projet "front end", assurez-vous que la configuration du serveur node accepte bien les requêtes cross-domain. 

Exemple de code de configuration pour le cross domain:

```javascript 
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	next();
});
```

## Modalités de rendu :

Projet à faire en binome, à rendre avant le 31 Janvier.
Repository github obligatoire, je veux la doc sur le README.md, je clonerai le répertoire, je suivrai vos instructions pour lancer le projet. Si ça ne marche pas -> des points en moins. 

Par exemple : 1) faire npm install 2) lancer "npm start"

Autre exemple : 1) creez une base mongo comme ceci 2) vérifier que la commande "mongod" est lancée 3) faites "npm install" 4) lancez "node server.js" 5) ouvrez "localhost:8081", si le port ne vous convient pas vous pouvez le changer dans le fichier server.js
OPTIONS POSSIBLES :

Faites-vous plaisir, si vous voulez ajouter des options n'hésitez pas, si vous voulez faire une app mobile avec React Native, ok aussi.

CE QUI EST INTERDIT: Ce qui est interdit c'est d'utiliser une autre technologie que celles vues en cours. Ou de me refourguer un truc piqué sur le Web.
