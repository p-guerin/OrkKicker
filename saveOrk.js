//Resolution du jeu
var resX = 320;
var resY = 240;

//Initialisation position
var posX = 0;

var posXexp_ = 205;
var posXnivobj = 210;

//Resolution de la HitBox
var hitX = 80;
var hitY = 50;
var hitHeight = 65;
var hitWidth = 60;


//Initialisation variables
var click = 0; //compteur de clic
var exp_ = 0; //expérience du joueur
var niveau = 1; //niveau du joueur
var nivobj = 10; //exp requis niveau supérieur
var organes = 0; //monnaie
var modarme = 0; //modificateur puissance de l'arme

//Initialisation de l'exponentiel de 10
var exponent = 0;

//Initialisation des images du jeu
var prairieImage = new Image();
prairieImage.src = 'img/prairie.png';
var guiImage = new Image();
guiImage.src = 'img/gui.png';
var orcSprite = new Image();
orcSprite.src = 'img/orc_walk.gif';


var requestAnimId;


// Armes
var arme = function (prix, image, puissance){
 this.prix = prix;
 this.image = new Image();
 this.image.src = image;
 this.puissance = puissance;
 this.present = function() {
   if (organes >= this.prix) {
   };
  };
 };
 this.acheter = function() {
     if (organes >= this.prix) {
       organes -= this.prix;
       this.puissance == modarme;
       play(buy);
       return true;
   };
};

function FourchetteClick(){
  var fourchette = new arme(10, 'img/fourchette.png', 50);
  fourchette.acheter;
}
//function ArmeClick() {
//  this.acheter
//};



//Mode achat
function changeImage(imagesrc, imageout) {
    if (imagesrc.match(imageout)) {
        imagesrc = "imagesrc";
    } else {
        image.src = "imageout";
    }
}

function BuyClick() {
    if (organes >= 10) {
        organes -= 10;
        play(buy);
        document.getElementById("organes").innerHTML = organes;
        changeImage(viet_idle, viet_thanks);
    };
};



//Clic Orc
function play(sound){
    sound.play();
    sound.currentTime = 0;
};

function fillCanvas(click, exp_, niveau, nivobj, organes, modarme){

  if (exp_ % Math.pow(10, exponent) == 0) {
    // quand le reste de la division de exp_ par un exponentiel de 10 (ex:10,100,1000,10000, ...) est égal à zéro:
    posXexp_ += 5; // déplacement du slash de 5 vers la droite
    posXnivobj += 5; // déplacement de l'expérience requise pour lvl up de 5 vers la droite
    exponent ++; // ajoute +1 a l'exponentiel
  }

  clickCanvasContext.clearRect( 0, 0 , resX, resY); // efface le canvas click
  clickCanvasContext.fillText("Clic :",175,60); // Affiche Clic :
  clickCanvasContext.fillText(click,200,60); // Affiche la valeur de click

  // pareil que pour click mais pour les variables niveau, exp_, organes.
  niveauCanvasContext.clearRect( 0, 0 , resX, resY);
  niveauCanvasContext.fillText("Niveau :",175,75);
  niveauCanvasContext.fillText(niveau,215,75);

  expCanvasContext.clearRect( 0, 0 , resX, resY);
  expCanvasContext.fillText("Exp :",175,90);
  expCanvasContext.fillText(exp_,200,90);
  expCanvasContext.fillText("/",posXexp_,90);
  expCanvasContext.fillText(nivobj,posXnivobj,90);

  organesCanvasContext.clearRect( 0, 0 , resX, resY);
  organesCanvasContext.fillText("Organes :",175,105);
  organesCanvasContext.fillText(organes,225,105);
};

function OrcClick(e) {

  //Fonction de récupération de la position de la souris
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    console.log(mouseX , mouseY);
    //HibBox grâce à la position de la souris.
    if (mouseX > 450 && mouseX < 450 + 200 && mouseY > 270 && mouseY < 270 + 210){
    click ++; // ajoute +1 à chaque clic sur l'orc
    organes += (niveau + modarme); // augmente la monnaie du joueur

    
    if (click % 2 == 0){
      // ajoute +1 à exp_ tous les 2 clics
      exp_ ++;
    };
    
    play(sproutch); // joue le son sproutch

    if (exp_ == nivobj) { 
    // quand le joueur à l'expérience requise pour passer au niveau suivant:
      niveau ++; // ajoute +1 au niveau
      nivobj *= 2; // double l'expérience requise pour passer le prochain niveau
    };
    fillCanvas(click, exp_, niveau, nivobj, organes, modarme); // envoie à la fonction fillCanvas les nouvelles valeurs
  };
};



//////////////////CANVAS//////////////////

var effacer_canvas = function () {
        "use strict";
        prairieCanvasContext.clearRect( 0, 0 , resX, resY);
        guiCanvasContext.clearRect( 0, 0 , resX, resY);
        orcCanvasContext.clearRect( 0, 0 , resX, resY);
};

var creerCanvasContext = function (name, width, height, zindex, color) {
        "use strict";
        var canvas = window.document.createElement("canvas");
        canvas.id = name;
        canvas.style.position = "absolute";
        canvas.style.left = "18%";
        if ( color !== undefined ){
                canvas.style.background = color;
        }
        canvas.style.zIndex = zindex;
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);
        return canvas.getContext('2d');
};

var init = function () {
  prairieCanvasContext = creerCanvasContext("prairie", resX, resY, 1);
  
  guiCanvasContext = creerCanvasContext("gui", resX, resY, 2);
  guiCanvasContext.drawImage(guiImage, 0, 0);
  
  orcCanvasContext = creerCanvasContext("orc", resX, resY, 3);
  orcCanvasContext.drawImage(orcSprite, 50, 80, 64, 64);
  //Affichage de la HitBox pour récuperer les coordonnées de la souris
  orcCanvasContext.fillStyle ='rgba(255, 0, 0, 0.3)';
  orcCanvasContext.fillRect(hitY, hitX, hitWidth, hitHeight);

  clickCanvasContext = creerCanvasContext("click", resX, resY, 2);
  clickCanvasContext.fillText("Clic :",175,60);
  clickCanvasContext.fillText(click,200,60);

  niveauCanvasContext = creerCanvasContext("niveau", resX, resY, 2);
  niveauCanvasContext.fillText("Niveau :",175,75);
  niveauCanvasContext.fillText(niveau,215,75);
  
  expCanvasContext = creerCanvasContext("exp", resX, resY, 2);
  expCanvasContext.fillText("Exp :",175,90);
  expCanvasContext.fillText(exp_,200,90);
  expCanvasContext.fillText("/",210,90);
  expCanvasContext.fillText(nivobj,215,90);

  organesCanvasContext = creerCanvasContext("organes", resX, resY, 2);
  organesCanvasContext.fillText("Organes :",175,105);
  organesCanvasContext.fillText(organes,225,105);

  guiCanvasContext.drawImage(guiImage, 0, 0);
  prairieCanvasContext.drawImage(prairieImage, posX, 0);
  orcCanvasContext.drawImage(orcSprite, 50, 80, 64, 64);


//Canvas HitBox + Fonction incrément du clic sur la HitBox//
  var ork = document.getElementById("orc");
  ork.addEventListener('click', OrcClick, false);

  requestAnimId = window.requestAnimationFrame(prairie);
};


var prairie = function () {
  posX -=1;
  if (posX == -312) {
    posX = 0;
  };
  prairieCanvasContext.clearRect( 0, 0 , resX, resY);
  prairieCanvasContext.drawImage(prairieImage, posX, 0);


  requestAnimId = window.requestAnimationFrame(prairie);

};

window.onload = init;