//AIDE: https://www.espruino.com/Bangle.js#-a-name-lcd-a-lcd-screen
//AIDE: https://banglejs.com/reference#l_Bangle_GPS
//AIDE: https://www.espruino.com/Bangle.js+Development
//---------------------------------------------------------------------------
//Emplacement des variables
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
//Emplacement des blibliotheques
//---------------------------------------------------------------------------

g.clear(); //Méthode permettant de nettoyer l'ecran
print("Ecran nettoyer"); //Fonction permettant d'écrire dans la console.
//E.showMessage("Hello","A Title"); //Une façon d'écrire un texte avec/sans un titre
Terminal.println("Code Name: ''Avonistan'' "); //Une autre façon d'écrire un texte sans mise-en-page ni titre; Ecriture simple.

setWatch(() => {
  g.clear(); //Méthode permettant de nettoyer l'ecran
  print("Bouton N°1"); //Fonction permettant d'écrire dans la console.
  Bangle.setGPSPower(0);     //On eteint le GPS
  Bangle.setCompassPower(0); //On eteint la boussole
  Terminal.println("Bouton N°1");
}, BTN1, {repeat:true});

setWatch(() => { //Si le bouton du millieux (Bouton 2) est actionnee alors, le GPS est activé puis la montre affiche les infos GPS.
  g.clear(); //Méthode permettant de nettoyer l'ecran

  print("Bouton N°2"); //Fonction permettant d'écrire dans la console.
  //-------------------------GPS--------------------------
  Bangle.setCompassPower(0); //On eteint la boussole
  Bangle.setGPSPower(1);     //On allume le GPS
  Bangle.on('GPS', function(gps){

    Terminal.print("Lat: "+ gps.lat);
    Terminal.println(" - Long: "+gps.lon);
    Terminal.println("Vitesse: "+gps.speed);
    Terminal.println("Altitude: "+gps.alt + " M");
    Terminal.println("Satellites: "+gps.satellites);
    Terminal.println(gps.time);
  });
  //-------------------------GPS--------------------------
  Terminal.println("Bouton N°2");
  //setTimeout(()=>g.clear(), 1000);
}, BTN2, {repeat:true});


setWatch(() => {
  g.clear(); //Méthode permettant de nettoyer l'ecran
  print("Bouton N°3"); //Fonction permettant d'écrire dans la console.
  //-------------------------Boussole--------------------------
  Bangle.setGPSPower(0);     //On eteint le GPS
  Bangle.setCompassPower(1); //On allume la boussole
  Bangle.on('mag', function(compass){

  if (isNaN(compass.heading)) {
    Terminal.println("Boussole non-calibré,");
    Terminal.println("Tournez sur vous-même à 360°.");
    print("Boussole non-calibré.");
    //Bangle.buzz();
  }

    else{
      Terminal.println(compass.heading + " °degrée");
    }
  //Bangle.setCompassPower(0);
  });
  //-------------------------Boussole--------------------------

  Terminal.println("Bouton N°3");
}, BTN3, {repeat:true});
