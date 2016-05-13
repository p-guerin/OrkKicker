//Resolution de base du jeu
var baseX = 320,
    baseY = 240;

var userHeight = window.innerHeight, // hauteur de la genetre du joueur
    resizer = userHeight / 240; // coefficient d'agrandissemnt de la résolution du jeu

var resX = baseX * resizer, // résolution X réelle du jeu
    resY = baseY * resizer; // résolution Y réelle du jeu

var game = document.getElementById("game");
    game.setAttribute("style","position: relative;width:" + (resX-1) + "px;height:" + resY + "px;cursor: url('img/os.png'), auto;overflow:hidden");

var resize = function(){
  // cette fonction édite les valeurs des variables userHeight, resizer, resX et resY quand le joueur redimensionne sa fenêtre
  userHeight = window.innerHeight,
  resizer = userHeight / 240,
  resX = baseX * resizer,
  resY = baseY * resizer;
  game.setAttribute("style","position: relative;width:" + resX + "px;height:" + resY + "px;overflow:hidden");
}

window.onresize = function(event) {
  //cette fonction vérifie si le joueur est en train de redimensionner le navigateur
  resize();
  effacer_canvas();
  init();
  score();

  console.log("Height:" + userHeight + "\nResizer:" + resizer + "\nResX:" + resX + "\nResY:" + resY);
};


//Initialisation position
var posX = 0,
    posXexp_ = 205,
    posXnivobj = 210;


//Initialisation variables
var click = 0, //compteur de clic
    exp_ = 0, //expérience du joueur
    niveau = 1, //niveau du joueur
    nivobj = 10, //exp requis niveau supérieur
    organes = 0, //monnaie
    modarme = 0; //modificateur puissance de l'arme


//Initialisation de l'exponentiel de 10
var exponent = 0;


//Initialisation des objets Images()
var guiImage = new Image();
guiImage.src = 'img/gui.png';

var prairieImage = new Image();
prairieImage.src = 'img/prairie.png';

var orcSprite = new Image();
orcSprite.src = 'img/orc_walk.gif';

var vietSprite = new Image();
vietSprite.src = 'img/viet_idle.png';

var osSprite = new Image();
osSprite.src = 'img/os.png';

var fourchetteSprite = new Image();
fourchetteSprite.src = 'img/fourchette.png';

var scieSprite = new Image();
scieSprite.src = 'img/scie.png';

var hacheSprite = new Image();
hacheSprite.src = 'img/hache.png';

var troncoSprite = new Image();
troncoSprite.src = 'img/tronco.gif';

var flingueSprite = new Image();
flingueSprite.src = 'img/flingue.png';


//Initialisation des sons
var sproutch = new Audio('sound/sproutch.wav');
var buy = new Audio('sound/buy.wav');


var requestAnimId;




//////////////////ORC//////////////////
function play(sound){
  sound.play();
  sound.volume = 0.33;
  sound.currentTime = 0;
};

function OrcClick() {
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

  console.log("click " + click + "\norganes " + organes + "\nexp_ " + exp_ + "\nnivobj " + nivobj + "\nniveau " + niveau)
};




//////////////////WEAPON//////////////////
var changeWeapon = function(e){
  if (organes >= 10){
    organes -= 10;
    if (e.path[0].id !== "tronco"){
      game.setAttribute("style","position: relative;width:" + resX + "px;height:" + resY + "px;overflow:hidden;cursor: url('img/" + e.path[0].id + ".png'), auto;");
    }else{
      game.setAttribute("style","position: relative;width:" + resX + "px;height:" + resY + "px;overflow:hidden;cursor: url('img/" + e.path[0].id + ".gif'), auto;");
    }
  }
};




//////////////////CANVAS//////////////////

var creerCanvas = function (name, width, height, top, left, zindex, color) {
  "use strict";
  var canvas = window.document.createElement("canvas");
  canvas.id = name;
  canvas.style.position = "absolute";
    if ( color !== undefined ){
      canvas.style.background = color;
    }
  canvas.style.zIndex = zindex;
  canvas.style.top = (top * resizer) + "px";
  canvas.style.left = (left * resizer) + "px";
  canvas.width = width * resizer;
  canvas.height = height * resizer;
  game.appendChild(canvas);
  return canvas.getContext('2d');
};


var effacer_canvas = function () {
  "use strict";
  gui_Canvas.clearRect( 0, 0 , resX, resY);
  prairie_Canvas.clearRect( 0, 0 , resX, resY);
  orc_Canvas.clearRect( 0, 0 , resX, resY);
  viet_Canvas.clearRect( 0, 0 , resX, resY);
  os_Canvas.clearRect( 0, 0, resX, resY);
  fourchette_Canvas.clearRect( 0, 0, resX, resY);
  scie_Canvas.clearRect( 0, 0, resX, resY);
  hache_Canvas.clearRect( 0, 0, resX, resY);
  tronco_Canvas.clearRect( 0, 0, resX, resY);
  flingue_Canvas.clearRect( 0, 0, resX, resY);
};




//////////////////SCORE//////////////////
var score = function() {
  text_Canvas.clearRect( 0, 0 , resX, resY);

  text_Canvas.font = (10 * (1 + (resizer / 2))) + "px Ubuntu";
  text_Canvas.fillStyle = "#9bbc0f";

  var textX = 25;
  var textY = 20 * resizer;
  
  //Première ligne
  text_Canvas.fillText("Organes : " + organes + "", textX, textY);

  //Deuxième Ligne
  textY += (20 * resizer);
  text_Canvas.fillText("Niveau : " + niveau + "", textX, textY);

  //Troisième ligne
  textY += (20 * resizer);
  text_Canvas.fillText("Exp : " + exp_ + "/" + nivobj + "", textX, textY);
};




//////////////////GAME//////////////////
var init = function () {
  gui_Canvas = creerCanvas("gui", 320, 240, 0, 0, 2);
  gui_Canvas.drawImage(guiImage, 0, 0, 320, 240, 0, 0, 320 * resizer, 240 * resizer);

  prairie_Canvas = creerCanvas("prairie", 468, 165, 0, 0, 1);
  prairie_Canvas.drawImage(prairieImage, 0, 0, 468, 165, 0, 0, 468 * resizer, 165 * resizer);

  orc_Canvas = creerCanvas("orc", 64, 64, 85, 50, 3);
  orc_Canvas.drawImage(orcSprite, 0, 0, 64, 64, 0, 0, 64 * resizer, 64 * resizer);

  viet_Canvas = creerCanvas("viet", 28, 37, 8.75, 227.5, 2);
  viet_Canvas.drawImage(vietSprite, 0, 0, 28, 37, 0, 0, 28 * resizer, 37 * resizer);

  os_Canvas = creerCanvas("os", 32, 32, 62.5, 187.5, 3);
  os_Canvas.drawImage(osSprite, 0, 0, 32, 32, 0, 0, 32 * resizer, 32 * resizer);

  fourchette_Canvas = creerCanvas("fourchette", 32, 32, 62.5, 227.5, 3);
  fourchette_Canvas.drawImage(fourchetteSprite, 0, 0, 32, 32, 0, 0, 32 * resizer, 32 * resizer);

  scie_Canvas = creerCanvas("scie", 32, 32, 62.5, 267.5, 3);
  scie_Canvas.drawImage(scieSprite, 0, 0, 32, 32, 0, 0, 32 * resizer, 32 * resizer);

  hache_Canvas = creerCanvas("hache", 32, 32, 115, 187.5, 3);
  hache_Canvas.drawImage(hacheSprite, 0, 0, 32, 32, 0, 0, 32 * resizer, 32 * resizer);

  tronco_Canvas = creerCanvas("tronco", 32, 32, 115, 227.5, 3);
  tronco_Canvas.drawImage(troncoSprite, 0, 0, 32, 32, 0, 0, 32 * resizer, 32 * resizer);

  flingue_Canvas = creerCanvas("flingue", 32, 32, 115, 267.5, 3);
  flingue_Canvas.drawImage(flingueSprite, 0, 0, 32, 32, 0, 0, 32 * resizer, 32 * resizer);

  text_Canvas = creerCanvas("text", 320, 70, 170, 0, 2);

  console.log(resizer);

  requestAnimId = window.requestAnimationFrame(main);
};


var CheckCanvas = function(e) {
  console.log(e.path[0].id);
}

var main = function() {
  
  var ork = document.getElementById("orc");
  ork.addEventListener('click', OrcClick, false);

  var os = document.getElementById("os");
  os.addEventListener('click', changeWeapon, false);

  var fourchette = document.getElementById("fourchette");
  fourchette.addEventListener('click', changeWeapon, false);

  var scie = document.getElementById("scie");
  scie.addEventListener('click', changeWeapon, false);

  var hache = document.getElementById("hache");
  hache.addEventListener('click', changeWeapon, false);

  var tronco = document.getElementById("tronco");
  tronco.addEventListener('click', changeWeapon, false);
  
  var flingue = document.getElementById("flingue");
  flingue.addEventListener('click', changeWeapon, false);

  score();

  posX +=1.5;
  if (posX == 312) {
    posX = 0;
  };

  prairie_Canvas.clearRect( 0, 0 , resX, resY);
  prairie_Canvas.drawImage(prairieImage, posX, 0, 468, 165, 0, 0, 468 * resizer, 165 * resizer);

  requestAnimId = window.requestAnimationFrame(main);
};

window.onload = init;