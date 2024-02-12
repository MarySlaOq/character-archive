// Reject unwanted requests

function block(){

    if(myuser == undefined || getCreatorByEmail(myuser.email) == undefined || getCreatorByEmail(myuser.email).access == undefined || getCreatorByEmail(myuser.email).access <= 1){
        document.getElementById("controls").innerHTML = `You don't have access to this page <br> <a href="index.html">Go home!</a>`;
    }else{

        loadStuff(getCreatorByEmail(myuser.email).access);
    }
}