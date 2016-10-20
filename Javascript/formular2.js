window.onload=function(){
    'use strict'; 
    
    var anmelden=document.getElementById('anmelden');
    var loggedIn=0;
    var logbutton=document.getElementById('jetztAnmelden');

    logbutton.addEventListener('click', formular, false);
    
    function formular(){
        console.log('inside formular');
        var vorname=document.getElementById("vorname").value;
        vorname=vorname.replace(/[^a-zA-Z ]/g,"");
        if(vorname.length>0){
            loggedIn++;
        } else {
            alert('Bitte geben Sie einen Vornamen ein.');
        }
        var nachname=document.getElementById("nachname").value;
        nachname=nachname.replace(/[^a-zA-Z ]/g,"");
        if(nachname.length>0){
            loggedIn++;
        } else {
            alert('Bitte geben Sie einen Nachnamen ein.');
        }
        var iq=document.getElementById("iq").value;
        if(iq>100&&iq<187){
            loggedIn++;
        }else{
            if(iq<100){
                alert('Es tut mir leid, Ihr geringer IQ wird den Erfolg bei Programmierungsarbeiten behindern.');
            }
            if(iq>187){
                alert('Das ist eine Lüge!');
            }
        }
        
        if(loggedIn===3){
            alert('Du bist angemeldet.');
            var daten=[loggedIn,vorname,nachname,iq]; // wird in String umgewandelt
            localStorage.setItem('datenArray', daten);
            
        }else{
            alert('Die Anmeldung war nicht erfolgreich. Versuchen Sie es erneut.');
        }
        
    }
    
    
};