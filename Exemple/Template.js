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

Terminal.println("Hello World"); //Une autre façon d'écrire un texte sans mise-en-page ni titre; Ecriture simple.

setWatch(() => {
  g.clear(); //Méthode permettant de nettoyer l'ecran
  print("Bouton N°1"); //Fonction permettant d'écrire dans la console.
  Terminal.println("Bouton N°1");
}, BTN1, {repeat:true});

setWatch(() => { //Si le bouton du millieux (Bouton 2) est actionnee alors, le GPS est activé puis la montre affiche les infos GPS.
  g.clear(); //Méthode permettant de nettoyer l'ecran

  print("Bouton N°2"); //Fonction permettant d'écrire dans la console.
  //-------------------------GPS--------------------------
  Bangle.setGPSPower(1);
  Bangle.on('GPS', function(gps){

    Terminal.print(gps.lat);
    Terminal.println(gps.lon);
    Terminal.println(gps.alt);
    Terminal.println(gps.speed);
    Terminal.println(gps.time);
    Terminal.println(gps.satellites);

  });

  //Exemple voulue
  //Terminal.println("Etat GPS: Connecter");
  //Terminal.println("Vue GPS: Connecter à 9 Satellites");
  //Terminal.print("Lat-Long: 420000-");
  //Terminal.println("1090912");
  //Exemple voulue
  //-------------------------GPS--------------------------

  Terminal.println("Bouton N°2");
  //setTimeout(()=>g.clear(), 1000);
}, BTN2, {repeat:true});


setWatch(() => {
  g.clear(); //Méthode permettant de nettoyer l'ecran
  print("Bouton N°3"); //Fonction permettant d'écrire dans la console.
  Terminal.println("Bouton N°3");
}, BTN3, {repeat:true});
