/* Aquest cartell es basa en els cartells d'un dels meus animes preferits: Revolutionary Girl Utena, especialment en la seva película (Revolutionary Girl Utena: Adolescence Apocalypse. 

Està inspirat en aquest cartell https://image.tmdb.org/t/p/original/4gEuxmg7OTc9Nxbg5pj5cVTaKCh.jpg, però realment m'he basat específicament en aquesta escena de la pel·lícula  http://ohtori.nu/gallery/Movie/Movie_Screenshots/Bedroom_Meeting_Dance_Sequence/Movie_Screen_0524. 

Tots els recursos utilitzats són extrets directament de la sèrie animada o la película, incloent el marc, les roses, la vidriera, el castell, les espases, etc. (Alguns d'ells els he trobat aquí (http://ohtori.nu/gallery/) o (http://ohtori.nu/vector/01_tracegallery_01.htm).

L'únic que no és original és la font, que he buscat unes que vegués que quedaven bé. Les fonts estan inspirades per la tipografia oficial del títol traduït https://www.themoviedb.org/t/p/original/mX454rIHSkRQcO0aKKmd44DowJg.jpg. 

Nota: una de les fonts (Romaunt Gaolines) fa que apareixi un missatge a la consola, però no sé ben bé què significa. Crec que té algo que veure amb l'estructura interna de la font. A nivell pràctic, no influencia en res del cartell. 

Incorpora els següents elements, que tenen sentit si un s'ha mirat la sèrie:

Especials:
- Una animació del vitrall de rosa al centre: un recurs simbòlic molt utilitzat en l'obra, representant el caràcter cíclic del món. 
- Una rosa que segueix el punter i que canvia segons l'àrea del pòster on sigui. 
- La capacitat de poder decorar el cartell amb roses de diferents tamanys. 
- Una animació que s'anima quan cliques al mig, on estan les protagonistes: simbolitza tant un dels poders d'Anthy (esquerra), que és extreure's una espasa del pit (lol) com el seu càstig: ser apunyalada per milers d'espases que representen l'odi de tota la humanitat. De la mateixa forma, les espases de la part inferior estan orientades cap al centre per representar-ho.
- Un missatge a la consola que es va repetint cada cop que cliques: fan al·lusió als colors principals de les roses dels diferents duelistes i personatges amb els que s'enfreta Utena.

Estàtics:
- Marc 
- Espases
- Centre -- Utena i Anthy (no he trobat un vector amb els dissenys de la pel·lícula però són molt similars)
- Text

*/

//__________ VARIABLES ;

// Recursos:

let font;
let font2;
let castel;
let marc;
let UTiAN;
let vitrall;
let espasa;
let espBL;
let rosaP1;
let rosaP2;

// Posició i rotació:

let rot = 0;

let punterX;
let punterY;
let espx = 1320;
let espy = 0;

// Altres:

let estatesp = false; // Booleana que farà l'animació de l'espasa quan sigui certa. 
let txtval = 0; // Valor inicial d'estat.

// Llistes:

let posX = [];
let posY = [];
let mida = [10, 20, 30];

let txt = ["green", "blue", "orange", "yellow", "red", "black", "pink"];
// Llista que servia per il·lustrar els missatges de la consola, però que a nivell pràctic no fa res perquè no es crida jej

/* En aquesta funció carreguem els recursos, que són les fonts i les imatges, que utilitzarem després. Els hi assignem un nom per poder cridar-les bé. */

function preload() {
  
  // Fonts:
  font2 = loadFont("fonts/Aston Script.ttf");
  font = loadFont("fonts/romauntgaolines.otf");

  // Imatges:
  castel = loadImage("imatges/castell.png");
  marc = loadImage("imatges/marcdoble.png");
  UTiAN = loadImage("imatges/utenanthyv.png");
  vitrall = loadImage("imatges/vidrers.png");
  espasa = loadImage("imatges/espasa.png");
  espBL = loadImage("imatges/espBL.png");

  rosaP1 = loadImage("imatges/punterNG.png");
  rosaP2 = loadImage("imatges/punterRS.png");
}

function setup() {
  
  // Creem el canvas amb la relació d'aspecte indicada. Jo he utilitzat un canvas de 900x1600.
  createCanvas(900, 1600);
  // Canviem el sistema de graus.
  angleMode(DEGREES);

  // Aquí el que fem és escalar la rosa que segueix el punter, multiplicant el tamany X i Y de la imatge original per la quantitat que volem escalar-lo. Això ens ajudarà després a que la posició no canvïi en comptes d'utilitzar la funció de scale.
  punterX = 348 * 0.2;
  punterY = 348 * 0.2;
}

function draw() {
  
  // ------ Fons -------
  background("#e677ae");
  fill("black");
  rect(0, 800, 900, 800);
  // ------ Fons -------

  // Vitrall. Amb cada execució del draw, augmenta l'angle de rotació.
  rosa(rot++);

  // ------ Roses interactives -------
  // Aquest bucle ens permet dibuixar les roses quan fem clic, ja que la posició s'actualitza mitjançant les llistes i l'afegiment de la posició del ratolí com a nou element de la llista. El condicional de dins fa que les roses siguin d'un color o un altre depenent de la zona del canva. 
  
  push();
  for (var j = 0; j < posY.length; j++) {
    imageMode(CENTER);
    if (posY[j] < 800) {
      image(rosaP1, posX[j], posY[j], punterX + mida[j], punterY + mida[j]);
    } else {
      image(rosaP2, posX[j], posY[j], punterX + mida[j], punterY + mida[j]);
    }
  }
  pop();

  
  // Cridem les funcions que dibuixen el castell i els textos. 
  castell();
  textREVGL();
  textADAP();
  
  // Posem el marc.
  image(marc, 0, 0);

  
  // ------ Animació d'espasa -------
  /* Aquest condicional fa que es produeixi l'animació quan l'estat sigui cert. El segon condicional limita la trajectòria de l'espasa per a què no atravessi tot el canvas. L'espasa solament es mourà quan la seva Y sigui menor o igual a 300px d'altura. Un cop allà, es detindrà. */
  
  if (estatesp == true) {
    espasaBL();
    if (espy <= 300) {
      espy = espy + 10;
    }
  }
  // --------------------------------
  
  // ------ Quadrat -------
  // Un rectangle que oculta part de l'espasa quan es produeix l'animació per a què quedi bé.
  fill("#e677ae");
  noStroke();
  rect(440, 590, 40, 70);
  // ----------------------
  
  // Cridem la imatge del centre i les espases. Establim el nombre d'espases que volem.
  anut();
  espases(7);

  // Punter
  punter(mouseX, mouseY);
}

function punter(x, y) {
  
  // En aquesta funció, utilitzem les variables establertes anteriorment per escalar el punter. Els dos últims paràmetres equivalen a l'amplada i l'alçada de la imatge.
  
  push();
  imageMode(CENTER);
  if (mouseY < 800) {
    image(rosaP1, x, y, punterX, punterY);
  } else {
    image(rosaP2, x, y, punterX, punterY);
  }
  pop();
}

function espasaBL() {
  // En aquesta funció, fem el dibuix de l'animació de l'espasa.
  
  push();
  rotate(30);
  scale(0.4);
  image(espBL, espx, espy);
  pop();
}

function mousePressed() {
  // Quan apretem el ratolí, se li afegeix a les llistes posX i posY la coordenada X i Y del ratolí com a últim element, fent que la rosa es pugui dibuixar on hem clicat. 
  
  posX.push(mouseX);
  posY.push(mouseY);

  // Les tres primeres roses sempre seran del mateix tamany, però després del tercer element de la llista, es seleccionarà un nombre aleatori entre 0, 20 o 50. 
  
  mida.push(int(random([0, 20, 50])));

  
  // Aquí fem que, si cliquem dins d'aquesta àrea, la booleana de l'estat de l'espasa sigui true. Això farà que aparegui l'animació de l'espasa. 
  
  if (mouseX < 650 && mouseX > 250 && mouseY < 850 && mouseY > 400) {
    estatesp = true;
  }

  
  // Cada cop que cliquis, el valor de txtval, inicialment 0, pujarà 1. Això farà que apareixin els missatges a la consola. Quan arriba a 8, torna a 0. 
  txtval = txtval + 1;

  switch (txtval) {
    case 1:
      print("Green Rose,");
      break;

    case 2:
      print("Blue Rose,");
      break;

    case 3:
      print("Orange Rose,");
      break;

    case 4:
      print("Yellow Rose,");
      break;

    case 5:
      print("Red Rose,");
      break;

    case 6:
      print("Black Rose.");
      break;

    case 7:
      print("Grant me the power to bring the world revolution——");
      break;
    case 8:
      txtval = 0;
      break;
  }
}

function anut() {
// Funció de la imatge de les protagonistes.
  
  push();
  translate(200, 400);
  scale(0.4);
  image(UTiAN, 0, 0);
  pop();
}

function espases(num) {
  
  // Establim el valor inicial de i.
  var i = 0;

  push();
  translate(450, 1100);
  rotate(-73.5);
  scale(0.35);

  // Aquí fem un condicional while. Mentre i sigui menor que el número que decidim, se li afegirà 1 a i. Un cop arribi al màxim, el bucle pararà de repetir-se. 
  
  while (i < num) {
    i++;
    rotate(30);
    image(espasa, 0, 0);
  }
  pop();
}

function castell() {
  // Funció del castell
  
  push();
  imageMode(CENTER);
  scale(0.8);

  image(castel, 560, 50);
  pop();
}

function textREVGL() {
  // Funció del text principal. Utilitzem diverses formes d'alineament. 
  
  textFont(font);
  textAlign(CENTER);
  textSize(350);
  text("UTENA", 450, 800);
  textFont(font2);
  push();
  textAlign(CENTER);
  textSize(90);
  strokeWeight(7);
  stroke("#e677ae");
  text("Revolutionary", 450, 420);
  textAlign(LEFT, TOP);
  text("Girl", 535, 400);
  pop();
}

function textADAP() {
  // Funció del text secundari.
  
  push();
  textFont(font);
  textAlign(CENTER, TOP);
  fill(230, 119, 174, 100); // Posem menys opacitat per no tapar les espases
  translate(450, 1210);
  rotate(180);
  textSize(100);
  text("APOCALYPSE", 0, 0);
  textSize(90);
  translate(0, -100);
  text("ADOLESCENCE", 0, 0);
  pop();
}

function rosa(rot) {
// Funció del vitrall
  
  push();
  imageMode(CENTER);
  translate(450, 780);
  scale(0.3);
  rotate(rot);
  image(vitrall, 0, 0);
  pop();
}

