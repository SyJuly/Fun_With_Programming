window.onload=function(){
    'use strict';
    
    var daten = localStorage.getItem("datenArray");
    
    //Anmeldung
    if (daten!==null){
        daten=daten.split(","); // wird hier wieder in ein Array umgewandelt
        console.log(daten);

        if(daten[0]==3){
            anmelden.innerHTML='Du bist angemeldet als '+daten[1]+' '+daten[2]+' ('+daten[3]+')';
        }
    }
    
    //Spiel
    var button = document.getElementById('doNotPush');
    var header = document.getElementsByTagName('header')[0];
    var ad = document.getElementsByClassName('advert')[0];
    
    var alreadyClicked = false;
    button.onclick = function(){
        if(alreadyClicked) { 
            return; 
        }
        
        alreadyClicked = true;
        ad.style.display='none';
        header.style.display='none';
        logOut();
        var dinoArray = [];
        var dinoXpos = [];
        var dinoTop=0;
        var dinoLeft=0;
        for (var i=0; i<8; i++){
            var newDino=document.createElement("img");
            newDino.setAttribute('src', './pics/1r.png');
            newDino.style.position='fixed';
            newDino.style.height='24%';
            newDino.style.top=dinoTop+'%';
            newDino.style.left=dinoLeft+'%';
            dinoXpos[i] = dinoLeft / 100 * window.innerWidth;
            document.body.appendChild(newDino);
            dinoTop +=25;
            if(i===3){
                dinoTop=0;
                dinoLeft=75;
            }
            dinoArray[i]=newDino;
        }

        for(var dinoIdx = 0; dinoIdx < dinoArray.length; dinoIdx++) {
            var d = dinoArray[dinoIdx];
            var randDirec = getRandomInt(0, 1);
            var interval;
            if (randDirec===0){
                interval = dinoMove(d, 'right', dinoXpos[dinoIdx]);
            } else{
                interval = dinoMove(d, 'left', dinoXpos[dinoIdx]);
            }
            d.onclick = killDino;
        }
    };
    
    function dinoMove(dino, direction, xPos){
        var i=0;
        var x= xPos;
        var right=true;
        if(direction==='left'){
            right=false;
        }
        var interv = setInterval(function(){
            i++;
            var counter=i.toString();
            if(right){
                x +=4;
                dino.src= './pics/'+counter+'r.png';
            } else{
                x -=4;
                dino.src= './pics/'+counter+'l.png';
            }
            dino.style.left=x+'px';
            dino.style.visibility = 'visible';
            if (i===15){
                i=1;
            }
            var randInt=getRandomInt(0,1000);
            var buttonPosition = x;
            var w = window.innerWidth;
            if(buttonPosition>=(w-144)&&right || buttonPosition<=0&&!right || randInt<5){
                right=!right;
            }
        }, 8);
        return interv;
    }
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    var dinosKilled = 0;
    function killDino(event){
        dinosKilled++;
        document.body.removeChild(event.target);
        if(dinosKilled >= 8) {
            dinosKilled = 0;
            for(var i = 1; i <= 8; ++i) {
                clearInterval(i);
            }
            alreadyClicked = false;
            header.style.display='block';
            ad.style.display='block';
        }
    }
  
    function logOut(){
        localStorage.clear();
        anmelden.innerHTML='Anmelden';
    }
    
    /*Ansatz für zufällige Drehung:
    var rotation=0;
    function rotate(image, rotation){
        image.style.transform = "rotate("+rotation+"deg)";
    }
    rotate(img,rotation);
    rotation=getRandomInt(-45,45);
    img.style.top=x*Math.tan(rotation * Math.PI / 180)+'px';
    */
};