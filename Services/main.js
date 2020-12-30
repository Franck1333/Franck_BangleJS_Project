//AIDE: https://www.espruino.com/Bangle.js#-a-name-lcd-a-lcd-screen
//AIDE: https://banglejs.com/reference#l_Bangle_GPS
//AIDE: https://www.espruino.com/Bangle.js+Development
//---------------------------------------------------------------------------
//Emplacement des variables
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//Emplacement des blibliotheques
//---------------------------------------------------------------------------

//Terminal.println("Code Name: Avonistan "); //Une autre façon d'ecrire un texte sans mise-en-page ni titre; Ecriture simple.
print("Code Name: Avonistan "); //Message afficher dans la console au lancement du programme

//--------------MENU--------------
//Définition du Menu
var mainmenu = {
  "" : {
    "Avonistan" : "Menu Principal"
  },
  "GPS" : function() { GPS(); },                                   //Ajout Fnct GPS
  "Boussole" : function() { Boussole(); },                         //Ajout Fnct Boussole
  "Cardiofrequencemetre" : function() { Cardiofrequencemetre(); }, //Ajout Fnct Cardiofrequencemetre
  "Arret des capteurs": function() {Stop();},                      //Ajout Fnct Stop
  "Exit" : function() { E.showMenu(mainmenu); },                   //Fnct permettant de quitter le menu
};
//Actually display the menu
E.showMenu(mainmenu);                                              //Affichage du menu
//--------------MENU--------------

//-------------------------GPS--------------------------
function GPS(){ //Fonction permettant d'utiliser le GPS
  g.clear(); //Méthode permettant de nettoyer l'ecran
  print("Fonction GPS"); //Fonction permettant d'écrire dans la console.
  Bangle.setCompassPower(0); //On eteint la boussole
  Bangle.setHRMPower(0);     //On eteint le cardiofrequencemetre
  Bangle.setGPSPower(1);     //On allume le GPS

  Bangle.on('GPS', function(gps){                     //Obtention des informations GPS

    Terminal.print(" Lat: "+ gps.lat);                //Obtention de la Latitude
    Terminal.println("  - Long: "+gps.lon);           //Obtention de la Longitude
    Terminal.println(" Vitesse: "+gps.speed);         //Obtention de la Vitesse
    Terminal.println(" Altitude: "+gps.alt + " M");   //Obtention de l'altitude
    Terminal.println(" Satellites: "+gps.satellites); //Obtention du nombre de satellite en vue
    Terminal.println(gps.time);                       //Obtention de la date+heure au fuseau Greenwich
  });
  Terminal.println(" Fonction GPS");
}
//-------------------------GPS--------------------------


//-------------------------Boussole--------------------------
function Boussole(){ //Fonction permettant d'utiliser la Boussole
  g.clear(); //Methode permettant de nettoyer l'ecran
  print(" Fonction Boussole"); //Fonction permettant d'ecrire dans la console.

  Bangle.setGPSPower(0);     //On eteint le GPS
  Bangle.setHRMPower(0);     //On eteint le cardiofrequencemetre
  Bangle.setCompassPower(1); //On allume la boussole

  Bangle.on('mag', function(compass){ //Obtention des information de la Boussole

  if (isNaN(compass.heading)) {   //Si la boussole n'est pas calibre, alors on demande de le faire a l'utilisateur
    Terminal.println(" Boussole non-calibre,");
    Terminal.println(" Tournez sur vous-meme à 360°.");  //Affichage d'un message a l'utilisateur
    print(" Boussole non-calibre.");                     //Affichage d'un message dans la console
    //Bangle.buzz();
  }
    else{
      Terminal.println(" "+compass.heading + " °degree"); //Affichage des informations de la Boussole
    }
  });
  Terminal.println(" Fonction Boussole");
}
//-------------------------Boussole--------------------------

//-------------------------Cardiofrequencemetre--------------------------
function Cardiofrequencemetre(){ //Fonction permettant d'utiliser le cardiofrequencemetre
  g.clear(); //Methode permettant de nettoyer l'ecran
  print(" Fonction Cardiofrequencemetre"); //Fonction permettant d'ecrire dans la console.

  Bangle.setGPSPower(0);     //On eteint le GPS
  Bangle.setCompassPower(0); //On eteint la boussole
  Bangle.setHRMPower(1);     //On allume le cardiofrequencemetre

  Bangle.on('HRM',function(hrm) {     //Obtention des informations du cardiofrequencemetre
    Terminal.println(hrm.bpm +" BPM");//Affichage des informations obtenues
  });
  Terminal.println(" Fonction Cardiofrequencemetre");
}
//-------------------------Cardiofrequencemetre--------------------------

//-------------------------Fonctionnalitee_Stop()--------------------------
function Stop(){  //Arret des différents capteurs
  g.clear(); //Methode permettant de nettoyer l'ecran
  print(" Arret des capteurs - Bouton N°4"); //Fonction permettant d'ecrire dans la console.
  Bangle.setGPSPower(0);     //On eteint le GPS
  Bangle.setCompassPower(0); //On eteint la boussole
  Bangle.setHRMPower(0);     //On eteint le cardiofrequencemetre
  Bangle.buzz();             //On fait vibrer la montre pour notifier l'utilisateur
  E.showMenu(mainmenu);      //On affiche le menu principale
  Terminal.println(" Arret des capteurs"); //On affiche ce message sur l'écran
}
setWatch(() => { //Si l'utilisateur touche le cote gauche de l'ecran tactile, alors la fonction Stop() sera lance
  Stop();  //Arrêt des differents capteurs
}, BTN4, {repeat:true});
//-------------------------Fonctionnalitee_Stop()--------------------------